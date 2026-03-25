import React from 'react'
import {assets} from "../assets/assets.js"
import { NavLink, useNavigate } from 'react-router-dom'
import "./utility.css"
import { useState, useEffect } from 'react'






const Navbar = () => {

    const navigate=useNavigate();
    const [showMenu, setshowMenu] = useState(false)
    const [token, settoken] = useState(localStorage.getItem('token') ? true : false)
    
    // Listen for login/logout changes
    useEffect(() => {
        const checkToken = () => {
            const storedToken = localStorage.getItem('token');
            settoken(storedToken ? true : false);
        };
        
        // Check on mount
        checkToken();
        
        // Listen for storage changes (when user logs in/out from other tabs)
        window.addEventListener('storage', checkToken);
        
        // Listen for custom token update event (when user logs in/out from this tab)
        window.addEventListener('tokenUpdated', checkToken);
        
        return () => {
            window.removeEventListener('storage', checkToken);
            window.removeEventListener('tokenUpdated', checkToken);
        };
    }, []);
    
    const handleLogout = () => {
        // Clear all auth tokens from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('aToken');
        localStorage.removeItem('dToken');
        settoken(false);
        // Dispatch event to notify any listeners
        window.dispatchEvent(new Event('tokenUpdated'));
        navigate('/login');
    }
  return (
    <div className='flex items-center border-b justify-between text-sm py-4 mb-5 border-b-gray-400'>
      <img onClick={()=>navigate("/")} src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
<NavLink to="/">
        
    <li className='py-1'>
        HOME
    </li>
    <hr className='border-none outline-none h-0.5 primary-color w-3/5 m-auto hidden '/>
</NavLink>
<NavLink to='/doctors'>
        
    <li className='py-1'>
      ALL DOCTORS
    </li>
    <hr className='border-none outline-none h-0.5 primary-color w-3/5 m-auto hidden '/>
</NavLink>
<NavLink to='/about'>
        
    <li className='py-1'>
       ABOUT
    </li>
    <hr className='border-none outline-none h-0.5 primary-color w-3/5 m-auto hidden '/>
</NavLink>
<NavLink to='/contact'>
        
    <li className='py-2'>
      CONTACT
    </li>
    <hr className='border-none outline-none h-0.5 primary-color w-3/5 m-auto hidden '/>
</NavLink>
      </ul>

<div className=' flex items-center gap-4 '>
    {
        token?
        <div className=' flex items-center gap-2 group relative cursor-pointer '>
            <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
            <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
                <div className=' absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'> 
            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 '>
                    <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                    <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout </p>
                </div>
            </div>
        </div>
        
        :<button onClick={()=>navigate("/login")} className='primary-color px-8 py-3 text-white rounded-full font-light hidden md:block '>CREATE ACCOUNT</button>
    }
</div>
    </div>
  )
}

export default Navbar
