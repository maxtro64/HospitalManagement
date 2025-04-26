import add_icon from './add_icon.svg'
import logo from "./logo.svg"
import admin_logo from './admin_logo.svg'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'
import profile_pic from "./profile_pic.png"
import dropdown_icon from "./dropdown_icon.svg"
import arrow_icon from "./arrow_icon.svg"
import header_img from "./header_img.png"
import group_profiles from "./group_profiles.png"
import General_physician from"./General_physician.svg"
import Neurologist from"./Neurologist.svg"
import Dermatologist from"./Dermatologist.svg"
import Gastroenterologist from"./Gastroenterologist.svg"
import Gynecologist from"./Gynecologist.svg"
import Pediatricians from "./Pediatricians.svg"
import appointment_img from "./appointment_img.png"
import doc1 from "./doc1.png"
import doc2 from "./doc2.png"
import doc3 from "./doc3.png"
import doc4 from "./doc4.png"
import doc5 from "./doc5.png"
import doc6 from "./doc6.png"
import doc7 from "./doc7.png"
import doc8 from "./doc8.png"
import doc9 from "./doc9.png"
import doc10 from "./doc10.png"
import about_image from "./about_image.png"
import contact_image from "./contact_image.png"



export const assets = {
    about_image,
    contact_image,
    appointment_img,
    logo,
    arrow_icon,
    header_img,
    group_profiles,
    dropdown_icon,
    profile_pic,
    add_icon,
    admin_logo,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon
}


export const specialityData=[

{
    speciality:'General physician',
    image:General_physician
},

{
    speciality:'Gynecologist',
    image:Gynecologist
},

{
    speciality:'Dermatologist',
    image:Dermatologist
},

{
    speciality:'Pediatricians',
    image:Pediatricians
},

{
    speciality:'Neurologist',
    image:Neurologist
},
{
    speciality:'Gastroenterologist',
    image:Gastroenterologist
}

]
export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        speciality: "General Physician",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Richard James has a strong commitment to delivering comprehensive medical care.",
        fees: 50,
        img: doc1,
        address: {
            line1: "7th cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Carter',
        speciality: "Cardiologist",
        degree: "MD, DM (Cardiology)",
        experience: "8 Years",
        about: "Dr. Emily Carter specializes in heart-related conditions and preventive cardiology.",
        fees: 120,
        img: doc2,
        address: {
            line1: "22 Park Avenue",
            line2: "Westminster, London"
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Michael Brown',
        speciality: "Neurologist",
        degree: "MD, DM (Neurology)",
        experience: "10 Years",
        about: "Dr. Michael Brown is an expert in treating disorders of the nervous system.",
        fees: 150,
        img: doc3,
        address: {
            line1: "15 High Street",
            line2: "Kensington, London"
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Sarah Wilson',
        speciality: "Pediatrician",
        degree: "MD, DCH",
        experience: "6 Years",
        about: "Dr. Sarah Wilson provides compassionate care for infants, children, and adolescents.",
        fees: 80,
        img: doc4,
        address: {
            line1: "33 Green Lane",
            line2: "Chelsea, London"
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. David Lee',
        speciality: "Orthopedic Surgeon",
        degree: "MS (Ortho)",
        experience: "12 Years",
        about: "Dr. David Lee specializes in bone, joint, and muscle-related surgeries.",
        fees: 200,
        img: doc5,
        address: {
            line1: "5 Oak Drive",
            line2: "Camden, London"
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Jessica Adams',
        speciality: "Dermatologist",
        degree: "MD, DVD",
        experience: "7 Years",
        about: "Dr. Jessica Adams treats skin, hair, and nail conditions with advanced techniques.",
        fees: 90,
        img: doc6,
        address: {
            line1: "12 Rose Street",
            line2: "Hammersmith, London"
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Robert Taylor',
        speciality: "Psychiatrist",
        degree: "MD, DPM",
        experience: "9 Years",
        about: "Dr. Robert Taylor provides mental health support and therapy.",
        fees: 110,
        img: doc7,
        address: {
            line1: "8 Willow Road",
            line2: "Islington, London"
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Olivia Harris',
        speciality: "Gynecologist",
        degree: "MD, DGO",
        experience: "11 Years",
        about: "Dr. Olivia Harris specializes in women's reproductive health and pregnancy care.",
        fees: 130,
        img: doc8,
        address: {
            line1: "19 Maple Avenue",
            line2: "Greenwich, London"
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Daniel Clark',
        speciality: "ENT Specialist",
        degree: "MS (ENT)",
        experience: "5 Years",
        about: "Dr. Daniel Clark treats ear, nose, and throat disorders with precision.",
        fees: 70,
        img: doc9,
        address: {
            line1: "3 Pine Street",
            line2: "Lambeth, London"
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Sophia Martinez',
        speciality: "Oncologist",
        degree: "MD, DM (Oncology)",
        experience: "15 Years",
        about: "Dr. Sophia Martinez is an expert in cancer diagnosis and treatment.",
        fees: 180,
        img: doc10,
        address: {
            line1: "27 Cedar Road",
            line2: "Southwark, London"
        }
    }
];