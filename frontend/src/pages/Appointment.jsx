import React, {useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctor from '../components/RelatedDoctor'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Appointment = () => {
  const {docId}=useParams()
  const {doctors,currencySymbol}=useContext(AppContext)
const [docInfo,setDocInfo]=useState(null)
const [docSlots,setDocsSlots]=useState([])
const [slotIndex,setSlotIndex]=useState(0)
const [slotTime,setSlotTime]=useState('')
const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
const navigate = useNavigate()

const bookAppointment = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        toast.warn('Login to book appointment')
        return navigate('/login')
    }

    try {
        const date = docSlots[slotIndex][0].datetime
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const slotDate = day + "_" + month + "_" + year

        const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })

        if (data.success) {
            toast.success(data.message)
            navigate('/my-appointments')
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message)
    }
}

const getAvailableSlots =async()=>{
  if (!docInfo || !docInfo.slots_booked) return;
  setDocsSlots([])
  let today=new Date()
  let slots_booked = docInfo.slots_booked
  for(let i=0;i<7;i++){
let currentDate=new Date(today)
currentDate.setDate(today.getDate()+i)

let day = currentDate.getDate()
let month = currentDate.getMonth() + 1
let year = currentDate.getFullYear()
const slotDate = day + "_" + month + "_" + year
let booked = slots_booked[slotDate] || []

let endTime=new Date()
endTime.setDate(today.getDate()+i)
endTime.setHours(21,0,0,0)
if(today.getDate()===currentDate.getDate()){
  currentDate.setHours(currentDate.getHours()>10? currentDate.getHours()+1:10)
 currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
}
else{
  currentDate.setHours(10)
  currentDate.setMinutes(0)
}

let timeSlots=[]
while(currentDate < endTime){
let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
  timeSlots.push({
    datetime:new Date(currentDate),
    time:formattedTime
  })
currentDate.setMinutes(currentDate.getMinutes()+30)

}

timeSlots = timeSlots.filter(slot => !booked.includes(slot.time))

setDocsSlots(prev=>([...prev,timeSlots]))

  }

}


  const fetchDocInfo=async()=>{
const docInfo=doctors.find(doc=>doc._id===docId)
setDocInfo(docInfo)
  }


  useEffect(() => {
    
  fetchDocInfo()
    
  }, [doctors,docId])
  

useEffect(() => {
  getAvailableSlots()
}, [docInfo])



  return docInfo &&(


    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className=' primary-color w-full sm:max-w-72 rounded-lg '  src={docInfo.img} alt="" />
        </div>
<div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0  '>
  
  <p className='flex items-center gap-2 text-2xl font-medium text-gray-900 '>{docInfo.name} 
    <img className='w-5' src={assets.verified_icon} alt="" /></p>



<div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
<p>{docInfo.degree} - {docInfo.speciality}</p>

<button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
</div>

<div>


<p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3 '>About <img src={assets.info_icon} alt="" /></p>
<p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
</div>
<p className='text-gray-500 font-medium mt-4'>Appointment fee:<span className='text-gray-600' >{currencySymbol}{docInfo.fees}</span></p>
</div>

</div>



<div className='sm:ml-72  sm:pl-4 mt-4 font-medium text-gray-700'>
<p>Booking slots</p>

<div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
  {
    docSlots.length&& docSlots.map((item,index)=>(
      <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index? 'primary-color text-white':'border border-gray-200'}`} key={index}>
<p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
<p>{item[0]&& item[0].datetime.getDate()}</p>

      </div>
    ))
  }
</div>

<div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 '>
  {docSlots.length&& docSlots[slotIndex].map((item,index)=>(
<p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime? "primary-color text-white": "text-gray-400 border border-gray-300"} `} key={index}> 

  {item.time.toLowerCase()}
</p>

  ))}
</div>
<button onClick={bookAppointment} className='primary-color text-white text-sm font-light px-14 rounded-full my-6 py-3'>Book an Appointment</button>
</div>



<RelatedDoctor docId={docId} speciality={docInfo.speciality}/>





      </div>









  )
}

export default Appointment
