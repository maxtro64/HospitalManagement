// Doctor Controller — handles doctor auth, appointments, profile, and dashboard
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/AppointmentModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Toggle doctor availability
const changeAvailablity = async (req, res) => {
    try {
        const docId = req.params.docId || req.body.docId
        const docData = await doctorModel.findById(docId)

        if (!docData) {
            return res.status(404).json({ success: false, message: 'Doctor not found' })
        }

        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        return res.status(200).json({ success: true, message: 'Availability Changed' })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// List all doctors (public)
const doctorsList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        return res.status(200).json({ success: true, doctors })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Doctor login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            return res.status(200).json({ success: true, token })
        } else {
            return res.status(401).json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Get doctor's appointments
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.user
        const appointments = await appointmentModel.find({ docId })
        return res.status(200).json({ success: true, appointments })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Mark appointment as completed
const appointmentComplete = async (req, res) => {
    try {
        const { docId } = req.user
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId.toString() === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.status(200).json({ success: true, message: "Appointment Completed" })
        } else {
            return res.status(404).json({ success: false, message: "Appointment not found or unauthorized" })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Cancel appointment (doctor)
const appointmentCancel = async (req, res) => {
    try {
        const { docId } = req.user
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId.toString() === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.status(200).json({ success: true, message: "Appointment Cancelled" })
        } else {
            return res.status(404).json({ success: false, message: "Appointment not found or unauthorized" })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Doctor dashboard — optimized
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.user
        const appointments = await appointmentModel.find({ docId })

        let earnings = 0
        const patients = []

        appointments.forEach((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        return res.status(200).json({ success: true, dashData })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Get doctor profile
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.user
        const profileData = await doctorModel.findById(docId).select('-password')

        if (!profileData) {
            return res.status(404).json({ success: false, message: 'Doctor not found' })
        }

        return res.status(200).json({ success: true, profileData })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Update doctor profile
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId } = req.user
        const { fee, address, available } = req.body

        const updatedDoctor = await doctorModel.findByIdAndUpdate(docId, { fee, address, available }, { new: true })

        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' })
        }

        return res.status(200).json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export { updateDoctorProfile, doctorProfile, changeAvailablity, doctorsList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard }