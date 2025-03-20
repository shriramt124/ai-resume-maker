import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Configure axios defaults
    axios.defaults.withCredentials = true;

    // Check if user is logged in on initial load
    useEffect(() => {
        checkAuthStatus();


    }, []); // Remove user dependency to prevent infinite loop
   

    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/isLoggedIn');
            if (response.data.isLoggedIn) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check error:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('http://localhost:3000/api/register', userData);
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('http://localhost:3000/api/login', credentials);
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await axios.post('http://localhost:3000/api/logout');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            setError(error.response?.data?.message || 'Logout failed');
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('http://localhost:3000/api/forgot-password', { email });
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send reset email');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token, newPassword) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post(`http://localhost:3000/api/reset-password/${token}`, { token, newPassword });
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Password reset failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const refreshAuthToken = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/refreshToken');
            return response.data;
        } catch (error) {
            console.error('Token refresh error:', error);
            setUser(null);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
        refreshAuthToken,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;