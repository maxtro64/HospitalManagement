import axios from "axios";
import { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [aToken, setAtoken] = useState(localStorage.getItem('aToken') || "");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(null);
    const [loading, setLoading] = useState(false);



    // Set auth token in axios defaults
    useEffect(() => {
        if (aToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${aToken}`;
            localStorage.setItem('aToken', aToken);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('aToken');
        }
    }, [aToken]);

    const handleError = (error) => {
        console.error("API Error:", error);
        const message = error.response?.data?.message || error.message || "Something went wrong";
        toast.error(message);
        return message;
    };

    const getAllDoctors = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`);
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }, [backendUrl]);

    const changeAvailability = async (docId) => {
        try {
            setLoading(true);
            const { data } = await axios.patch(
                `${backendUrl}/api/admin/doctors/${docId}/availability`
            );
            if (data.success) {
                toast.success(data.message);
                await getAllDoctors();
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const getAllAppointments = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`);
            if (data.success) {
                setAppointments(data.appointments);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }, [backendUrl]);

    const cancelAppointment = async (appointmentId) => {
        try {
            setLoading(true);
            const { data } = await axios.patch(
                `${backendUrl}/api/admin/appointments/${appointmentId}/cancel`
            );
            if (data.success) {
                toast.success(data.message);
                await getAllAppointments();
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const getDashData = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`);
            if (data.success) {
                setDashData(data.data); // Changed from data.message to data.data
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }, [backendUrl]);

    // Initialize data if token exists
    useEffect(() => {
        if (aToken) {
            getDashData();
            getAllDoctors();
            getAllAppointments();
        }
    }, [aToken, getDashData, getAllDoctors, getAllAppointments]);

    const value = {
        aToken,
        setAtoken,
        backendUrl,
        doctors,
        appointments,
        dashData,
        loading,
        getAllDoctors,
        changeAvailability,
        getAllAppointments,
        cancelAppointment,
        getDashData
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;