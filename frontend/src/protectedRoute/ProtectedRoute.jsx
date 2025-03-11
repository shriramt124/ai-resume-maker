import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
function ProtectedRoute({children}) {
    const { user, logout } = useAuth();
    return user ? children : <Navigate to="/login" />;
   
}

export default ProtectedRoute