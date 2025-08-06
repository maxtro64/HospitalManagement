import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';

import Navbar from './components/Navbar';
import SideBar from './components/SideBar';

import { Routes, Route, Navigate } from 'react-router-dom';

// Admin pages
import Dashboard from './pages/Admin/Dashboard';
import Allappointments from './pages/Admin/Allappointments';
import AddDoctor from './pages/Admin/AddDoctor';
import Doctorlist from './pages/Admin/Doctorlist';

// Doctor pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const isLoggedIn = aToken || dToken;

  return (
    <div className="bg-[#f8f9fd] min-h-screen">
      <ToastContainer />
      {isLoggedIn ? (
        <>
          <Navbar />
          <div className="flex">
            <SideBar />
            <div className="flex-1 p-4">
              <Routes>
                {/* Common Routes */}
                <Route path="/" element={<Navigate to={aToken ? "/admin-dashboard" : "/doctor-dashboard"} />} />

                {/* Admin Routes */}
                {aToken && (
                  <>
                    <Route path="/admin-dashboard" element={<Dashboard />} />
                    <Route path="/all-appointments" element={<Allappointments />} />
                    <Route path="/add-doctor" element={<AddDoctor />} />
                    <Route path="/doctor-list" element={<Doctorlist />} />
                  </>
                )}

                {/* Doctor Routes */}
                {dToken && (
                  <>
                    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                    <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                    <Route path="/doctor-profile" element={<DoctorProfile />} />
                  </>
                )}
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
