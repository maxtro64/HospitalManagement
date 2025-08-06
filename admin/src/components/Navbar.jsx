import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
    const { aToken, setAtoken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext);
    const navigate = useNavigate();

    const logout = () => {
        try {
            // Clear tokens from state
            if (aToken) {
                setAtoken('');
                localStorage.removeItem('aToken');
            }
            if (dToken) {
                setDToken('');
                localStorage.removeItem('dToken');
            }
            
            // Navigate to home
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className='flex justify-between items-center px-4 md:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img 
                    className='w-36 sm:w-40 cursor-pointer' 
                    src={assets.admin_logo} 
                    alt="Logo" 
                    onClick={() => navigate('/')} 
                />
                <p className='border p-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
                    {aToken ? "Admin" : dToken ? "Doctor" : "Guest"}
                </p>
            </div>
            {(aToken || dToken) && (
                <button 
                    onClick={logout} 
                    className='bg-[#5F6fff] text-white text-sm px-6 py-2 rounded-full hover:bg-[#4a5ae9] transition-colors'
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Navbar;