import { useState } from 'react'

import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Contact from './pages/Contact'
import About from './pages/About'
import Doctors from './pages/Doctors'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Footer from './components/Footer'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='mx-10  my-10'>

    <Navbar/>
    
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/doctors' element={<Doctors/>}/>
    <Route path='/doctors/:speciality' element={<Doctors/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/my-profile' element={<MyProfile/>}/>
    <Route path='/my-appointments' element={<MyAppointments/>}/>
    <Route path='/appointment/:docId' element={<Appointment/>}/>
   </Routes>
   <Footer/>
    </div>
    </>
  )
}

export default App
