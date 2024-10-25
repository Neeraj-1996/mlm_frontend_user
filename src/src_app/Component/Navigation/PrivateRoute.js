// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
        return <Navigate to="/Homepage" replace />; // Redirect to Homepage if already logged in
    }

    return children; // Render the LoginPage if not logged in
};

export default PrivateRoute;
