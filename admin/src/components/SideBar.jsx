import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const SideBar = () => {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    // Common NavLink styles
    const navLinkStyle = ({ isActive }) => 
        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
            isActive 
                ? "bg-[#f2f3ff] border-r-4 border-[#5f6fff] text-[#5f6fff]" 
                : "hover:bg-gray-50"
        }`;

    return (
        <div className='min-h-screen bg-white border-r w-full md:w-72'>
            {aToken && (
                <ul className='text-[#515151] mt-5'>
                    <li>
                        <NavLink to='/admin-dashboard' className={navLinkStyle}>
                            <img src={assets.home_icon} alt="Dashboard" />
                            <span className='hidden md:block'>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/all-appointments' className={navLinkStyle}>
                            <img src={assets.appointment_icon} alt="Appointments" />
                            <span className='hidden md:block'>Appointments</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add-doctor' className={navLinkStyle}>
                            <img src={assets.add_icon} alt="Add Doctor" />
                            <span className='hidden md:block'>Add Doctor</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/doctor-list' className={navLinkStyle}>
                            <img src={assets.people_icon} alt="Doctors List" />
                            <span className='hidden md:block'>Doctors List</span>
                        </NavLink>
                    </li>
                </ul>
            )}
            
            {dToken && (
                <ul className='text-[#515151] mt-5'>
                    <li>
                        <NavLink to='/doctor-dashboard' className={navLinkStyle}>
                            <img src={assets.home_icon} alt="Dashboard" />
                            <span className='hidden md:block'>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/profile-appointments' className={navLinkStyle}>
                            <img src={assets.appointment_icon} alt="Appointments" />
                            <span className='hidden md:block'>Appointments</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/doctor-profile' className={navLinkStyle}>
                            <img src={assets.people_icon} alt="Profile" />
                            <span className='hidden md:block'>Profile</span>
                        </NavLink>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default SideBar;