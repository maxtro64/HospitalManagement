// Admin Controller — handles doctor management, appointments, and dashboard
import validator from "validator"
import bcrypt from "bcrypt"
import doctorModel from "../models/doctorModel.js"
import userModel from "../models/userModel.js"
import { v2 as cloudinary } from "cloudinary"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/AppointmentModel.js"

// Add a new doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fee, address } = req.body
        const imageFile = req.file

        if (!name || !email || !password || !degree || !experience || !speciality || !about || !fee || !address || !imageFile) {
            return res.status(400).json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" })
        }

        const existingDoctor = false;

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "auto" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee: Number(fee),
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        return res.status(201).json({ success: true, message: "Doctor Added" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.status(200).json({ success: true, token })
        } else {
            return res.status(401).json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Get all doctors
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        return res.status(200).json({ success: true, doctors })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Get all appointments
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        return res.status(200).json({ success: true, appointments })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Cancel an appointment (admin)
const appointmentCancel = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId || req.body.appointmentId
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" })
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

        return res.status(200).json({ success: true, message: "Appointment Cancelled" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Admin dashboard — optimized with countDocuments
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const patients = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const data = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        return res.status(200).json({ success: true, data })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export { adminDashboard, addDoctor, loginAdmin, appointmentCancel, allDoctors, appointmentsAdmin }
