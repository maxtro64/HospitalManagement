import 'dotenv/config'
import mongoose from 'mongoose'
import doctorModel from './models/doctorModel.js'
import connectDb from './config/mongoDb.js'
import bcrypt from 'bcrypt'

const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        speciality: "General Physician",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Richard James has a strong commitment to delivering comprehensive medical care.",
        fees: 50,
        image: "doc1.png",
        address: {
            line1: "7th cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        email: "doc1@example.com",
        password: "password123",
        available: true
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Carter',
        speciality: "Cardiologist",
        degree: "MD, DM (Cardiology)",
        experience: "8 Years",
        about: "Dr. Emily Carter specializes in heart-related conditions and preventive cardiology.",
        fees: 120,
        image: "doc2.png",
        address: {
            line1: "22 Park Avenue",
            line2: "Westminster, London"
        },
        email: "doc2@example.com",
        password: "password123",
        available: true
    },
    {
        _id: 'doc3',
        name: 'Dr. Michael Brown',
        speciality: "Neurologist",
        degree: "MD, DM (Neurology)",
        experience: "10 Years",
        about: "Dr. Michael Brown is an expert in treating disorders of the nervous system.",
        fees: 150,
        image: "doc3.png",
        address: {
            line1: "15 High Street",
            line2: "Kensington, London"
        },
        email: "doc3@example.com",
        password: "password123",
        available: true
    },
    {
        _id: 'doc4',
        name: 'Dr. Sarah Wilson',
        speciality: "Pediatrician",
        degree: "MD, DCH",
        experience: "6 Years",
        about: "Dr. Sarah Wilson provides compassionate care for infants, children, and adolescents.",
        fees: 80,
        image: "doc4.png",
        address: {
            line1: "33 Green Lane",
            line2: "Chelsea, London"
        },
        email: "doc4@example.com",
        password: "password123",
        available: true
    },
    {
        _id: 'doc5',
        name: 'Dr. David Lee',
        speciality: "Orthopedic Surgeon",
        degree: "MS (Ortho)",
        experience: "12 Years",
        about: "Dr. David Lee specializes in bone, joint, and muscle-related surgeries.",
        fees: 200,
        image: "doc5.png",
        address: {
            line1: "5 Oak Drive",
            line2: "Camden, London"
        },
        email: "doc5@example.com",
        password: "password123",
        available: true
    },
    {
        _id: 'doc6',
        name: 'Dr. Jessica Adams',
        speciality: "Dermatologist",
        degree: "MD, DVD",
        experience: "7 Years",
        about: "Dr. Jessica Adams treats skin, hair, and nail conditions with advanced techniques.",
        fees: 90,
        image: "doc6.png",
        address: {
            line1: "12 Rose Street",
            line2: "Hammersmith, London"
        },
        email: "doc6@example.com",
        password: "password123",
        available: true
    }
]

const insertDoctors = async () => {
    try {
        await connectDb()
        
        for (const doc of doctors) {
            const existing = await doctorModel.findById(doc._id)
            if (!existing) {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(doc.password, salt)
                const doctorData = { 
                    ...doc, 
                    password: hashedPassword,
                    slots_booked: {},
                    date: new Date()
                }
                await doctorModel.create(doctorData)
                console.log(`✓ Inserted ${doc.name}`)
            } else {
                console.log(`○ ${doc.name} already exists`)
            }
        }
        
        console.log('\n✓ Doctors database seeding complete!')
        process.exit(0)
    } catch (error) {
        console.error('✗ Error inserting doctors:', error.message)
        process.exit(1)
    }
}

insertDoctors()