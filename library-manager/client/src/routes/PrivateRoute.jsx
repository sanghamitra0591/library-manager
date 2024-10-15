import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.userLoggedIn);
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default PrivateRoute;
