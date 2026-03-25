// User Controller — handles registration, login, profile, appointments, payments
import validator from 'validator'
import bcrypt from "bcrypt"
import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from 'cloudinary'
import razorpay from 'razorpay'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/AppointmentModel.js'

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !password || !email) {
            return res.status(400).json({ success: false, message: "Missing Details" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({ name, email, password: hashedPassword })
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.status(201).json({ success: true, token })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Login an existing user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            return res.status(200).json({ success: true, token })
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Get user profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.userId

        if (!userId) {
            return res.status(401).json({ success: false, message: 'User ID not found in request' })
        }

        const userData = await userModel.findById(userId).select('-password')

        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        return res.status(200).json({ success: true, userData })

    } catch (error) {
        console.error('Profile Error:', error)
        return res.status(500).json({ success: false, message: 'Server error fetching profile' })
    }
}

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.userId
        const { name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!userId || !name || !phone || !address || !dob || !gender) {
            return res.status(400).json({ success: false, message: "Data Missing" })
        }

        const updateData = {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender
        }

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            updateData.image = imageUpload.secure_url
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password')

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        return res.status(200).json({ success: true, message: "Profile Updated", userData: updatedUser })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Book an appointment
const bookAppointment = async (req, res) => {
    try {
        const userId = req.user.userId
        const { docId, slotDate, slotTime } = req.body

        if (!userId || !docId || !slotDate || !slotTime) {
            return res.status(400).json({ success: false, message: 'Missing required fields' })
        }

        // Find doctor and user in parallel
        const [docData, userData] = await Promise.all([
            doctorModel.findById(docId).select('-password'),
            userModel.findById(userId).select('-password')
        ])

        if (!docData) {
            return res.status(404).json({ success: false, message: 'Doctor not found' })
        }
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        if (!docData.available) {
            return res.status(400).json({ success: false, message: "Doctor not available" })
        }

        // Check slot availability
        let slots_booked = docData.slots_booked || {}
        if (!slots_booked[slotDate]) {
            slots_booked[slotDate] = []
        }
        if (slots_booked[slotDate].includes(slotTime)) {
            return res.status(409).json({ success: false, message: 'Slot not available' })
        }

        // Create appointment
        const appointmentData = {
            userId,
            docId,
            userData: userData.toObject(),
            docData: { ...docData.toObject(), slots_booked: undefined },
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        // Book the slot and save (no transaction — works on all MongoDB tiers)
        slots_booked[slotDate].push(slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        res.status(201).json({ success: true, message: "Appointment Booked" })

    } catch (error) {
        console.error('Error booking appointment:', error)
        res.status(500).json({ success: false, message: error.message || 'Internal server error' })
    }
}

// List user's appointments
const listAppointment = async (req, res) => {
    try {
        const userId = req.user.userId
        const appointments = await appointmentModel.find({ userId })
        res.status(200).json({ success: true, appointments })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// Cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.user.userId
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" })
        }

        // Check if appointment belongs to user
        if (appointmentData.userId !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized to cancel this appointment" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // Free up the slot
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        if (doctorData) {
            let slots_booked = doctorData.slots_booked
            if (slots_booked[slotDate]) {
                slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
            }
            await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        }

        res.status(200).json({ success: true, message: "Appointment Cancelled" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// Razorpay payment
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.status(400).json({ success: false, message: "Appointment not found" })
        }

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        const order = await razorpayInstance.orders.create(options)
        res.status(200).json({ success: true, order })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// Verify Razorpay payment
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.status(200).json({ success: true, message: "Payment Successful" })
        } else {
            res.status(400).json({ success: false, message: "Payment Failed" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay }