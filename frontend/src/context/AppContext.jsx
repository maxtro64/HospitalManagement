import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { doctors as staticDoctors } from '../assets/assets'

export const AppContext=createContext()

const AppContextProvider=(props)=>{

const currencySymbol="$"
const [doctors, setDoctors] = useState(staticDoctors) // Start with static doctors immediately

const getDoctorsData = async () => {
    try {
        const { data } = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/doctor/list')
        if (data.success && data.doctors.length > 0) {
            // Merge with static doctors to get correct images
            const mergedDoctors = data.doctors.map(apiDoc => {
                const staticDoc = staticDoctors.find(s => s._id === apiDoc._id)
                return staticDoc ? { ...apiDoc, img: staticDoc.img } : apiDoc
            })
            setDoctors(mergedDoctors)
        }
    } catch (error) {
        console.error('Error fetching doctors from backend, using static doctors:', error)
        // Fallback to static doctors
        setDoctors(staticDoctors)
    }
}

useEffect(() => {
    getDoctorsData()
}, [])

    const value={
doctors,currencySymbol
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
