import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const Allappointments = () => {
  const {aToken,appointments,cancelAppointment,getAllAppointments}=useContext(AdminContext)
 const {calculateAge,currency,slotDateFormat}=useContext(AppContext)
  useEffect(() => {
    if(aToken){
      getAllAppointments()
    }
  }, [aToken])
  

  return (
    <div className='w-full max-w-6xl m-5 '>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      
<div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

<div className='hidden sm:grid gird-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
  <p>#</p>
  <p>Patient</p>
  <p>Age</p>
  <p>Date & Time</p>
  <p>Doctor</p>
  <p>Fees</p>
  <p>Actions</p>
  
</div>
{
  appointments.map((item,index)=> (
    <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
      <p className='max-sm:hidden'>{index+1}</p>
      <div className='flex gap-2 items-center'>
        <img className='w-8 rounded-full' src={item.userData?.image || assets.profile_pic || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"%3E%3Crect width="150" height="150" fill="%23ddd"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E'} alt={item.userData?.name || 'user'} />
        <p>{item.userData?.name || 'Unknown'}</p>
      </div>
      <p className='max-sm:hidden'>{calculateAge(item.userData?.dob)}</p>
      <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
      <div className='flex gap-2 items-center'>
        <img className='w-8 rounded-full bg-gray-200' src={item.docData?.image || assets.profile_pic || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"%3E%3Crect width="150" height="150" fill="%23ddd"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E'} alt={item.docData?.name || 'doctor'} />
        <p>{item.docData?.name || 'Unknown Doctor'}</p>
      </div>
      <p>{currency}{item.amount}</p>
      {item.cancelled?
      <p className='text-green-400 text-xs font-medium'>Cancelled</p>:
      item.isCompleted ?<p className='text-red-400 text-xs font-medium'>Completed</p>:
      <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon}  className='w-10 cursor-pointer' alt="" />
      }
    </div>
  ))
}







</div>



    </div>
  )
}

export default Allappointments
