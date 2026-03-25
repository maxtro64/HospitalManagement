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
        image: "/assets/doc1-DpAa9vNj.png",
        address: {
            line1: "7th cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        email: "doc1@example.com",
        password: "password123", // hashed later
        date: Date.now()
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Carter',
        speciality: "Cardiologist",
        degree: "MD, DM (Cardiology)",
        experience: "8 Years",
        about: "Dr. Emily Carter specializes in heart-related conditions and preventive cardiology.",
        fees: 120,
        image: "/assets/doc2-Y_tw-_wb.png",
        address: {
            line1: "22 Park Avenue",
            line2: "Westminster, London"
        },
        email: "doc2@example.com",
        password: "password123",
        date: Date.now()
    },
    {
        _id: 'doc3',
        name: 'Dr. Michael Brown',
        speciality: "Neurologist",
        degree: "MD, DM (Neurology)",
        experience: "10 Years",
        about: "Dr. Michael Brown is an expert in treating disorders of the nervous system.",
        fees: 150,
        image: "/assets/doc3-D46sSx07.png",
        address: {
            line1: "15 High Street",
            line2: "Kensington, London"
        },
        email: "doc3@example.com",
        password: "password123"
    },
    {
        _id: 'doc4',
        name: 'Dr. Sarah Wilson',
        speciality: "Pediatrician",
        degree: "MD, DCH",
        experience: "6 Years",
        about: "Dr. Sarah Wilson provides compassionate care for infants, children, and adolescents.",
        fees: 80,
        image: "/assets/doc4-BJ7TwJ-q.png",
        address: {
            line1: "33 Green Lane",
            line2: "Chelsea, London"
        },
        email: "doc4@example.com",
        password: "password123"
    },
    {
        _id: 'doc5',
        name: 'Dr. David Lee',
        speciality: "Orthopedic Surgeon",
        degree: "MS (Ortho)",
        experience: "12 Years",
        about: "Dr. David Lee specializes in bone, joint, and muscle-related surgeries.",
        fees: 200,
        image: "/assets/doc5-DMyOgDQL.png",
        address: {
            line1: "5 Oak Drive",
            line2: "Camden, London"
        },
        email: "doc5@example.com",
        password: "password123"
    },
    {
        _id: 'doc6',
        name: 'Dr. Jessica Adams',
        speciality: "Dermatologist",
        degree: "MD, DVD",
        experience: "7 Years",
        about: "Dr. Jessica Adams treats skin, hair, and nail conditions with advanced techniques.",
        fees: 90,
        image: "/assets/doc6-BBgIGkd-.png",
        address: {
            line1: "12 Rose Street",
            line2: "Hammersmith, London"
        },
        email: "doc6@example.com",
        password: "password123"
    },
    {
        _id: 'doc7',
        name: 'Dr. Robert Taylor',
        speciality: "Psychiatrist",
        degree: "MD, DPM",
        experience: "9 Years",
        about: "Dr. Robert Taylor provides mental health support and therapy.",
        fees: 110,
        image: "/assets/doc7-Jj6FmILj.png",
        address: {
            line1: "8 Willow Road",
            line2: "Islington, London"
        },
        email: "doc7@example.com",
        password: "password123"
    },
    {
        _id: 'doc8',
        name: 'Dr. Olivia Harris',
        speciality: "Gynecologist",
        degree: "MD, DGO",
        experience: "11 Years",
        about: "Dr. Olivia Harris specializes in women's reproductive health and pregnancy care.",
        fees: 130,
        image: "/assets/doc8-IA4IHo5Z.png",
        address: {
            line1: "19 Maple Avenue",
            line2: "Greenwich, London"
        },
        email: "doc8@example.com",
        password: "password123"
    },
    {
        _id: 'doc9',
        name: 'Dr. Daniel Clark',
        speciality: "ENT Specialist",
        degree: "MS (ENT)",
        experience: "5 Years",
        about: "Dr. Daniel Clark treats ear, nose, and throat disorders with precision.",
        fees: 70,
        image: "/assets/doc9-DFlzAwfe.png",
        address: {
            line1: "3 Pine Street",
            line2: "Lambeth, London"
        },
        email: "doc9@example.com",
        password: "password123"
    },
    {
        _id: 'doc10',
        name: 'Dr. Sophia Martinez',
        speciality: "Oncologist",
        degree: "MD, DM (Oncology)",
        experience: "15 Years",
        about: "Dr. Sophia Martinez is an expert in cancer diagnosis and treatment.",
        fees: 180,
        image: "/assets/doc10-CAm4njsj.png",
        address: {
            line1: "27 Cedar Road",
            line2: "Southwark, London"
        },
        email: "doc10@example.com",
        password: "password123"
    }
];

const insertDoctors = async () => {
    try {
        await connectDb();
        doctors.forEach(doc => doc.date = Date.now());
        for (const doc of doctors) {
            const existing = await doctorModel.findById(doc._id);
            if (!existing) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(doc.password, salt);
                const doctorData = { ...doc, password: hashedPassword };
                await doctorModel.create(doctorData);
                console.log(`Inserted ${doc.name}`);
            } else {
                // Update image if different
                if (existing.image !== doc.image) {
                    await doctorModel.findByIdAndUpdate(doc._id, { image: doc.image });
                    console.log(`Updated image for ${doc.name}`);
                } else {
                    console.log(`${doc.name} already exists`);
                }
            }
        }
        console.log('Doctors insertion complete');
        process.exit(0);
    } catch (error) {
        console.error('Error inserting doctors:', error);
        process.exit(1);
    }
};

insertDoctors();