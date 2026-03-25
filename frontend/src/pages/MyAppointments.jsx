import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const { data } = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/user/my-appointments', { headers: { token } })
        if (data.success) {
          setAppointments(data.appointments)
        }
      } catch (error) {
        toast.error('Failed to load appointments')
      }
    }
    fetchAppointments()
  }, [])

  const cancelAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success('Appointment cancelled')
        setAppointments(prev => prev.map(app => app._id === appointmentId ? { ...app, cancelled: true } : app))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to cancel appointment')
    }
  }

  const payAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          order_id: data.order.id,
          name: 'Appointment Payment',
          description: 'Appointment Payment',
          handler: async (response) => {
            try {
              const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/verifyRazorpay', { razorpay_order_id: response.razorpay_order_id }, { headers: { token } })
              if (data.success) {
                toast.success('Payment successful')
                setAppointments(prev => prev.map(app => app._id === appointmentId ? { ...app, payment: true } : app))
              } else {
                toast.error('Payment failed')
              }
            } catch (error) {
              toast.error('Payment verification failed')
            }
          }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to initiate payment')
    }
  }

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.img} alt="" />
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {item.slotDate} | {item.slotTime}</p>
              </div>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all'>Cancel appointment</button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button onClick={() => payAppointment(item._id)} className='text-sm text-green-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-600 hover:text-white transition-all'>Pay Online</button>
              )}
              {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
              {item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Paid</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
