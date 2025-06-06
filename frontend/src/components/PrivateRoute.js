import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children, requiredRoles }) => {
    const { user, loading, hasRole } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRoles && !hasRole(requiredRoles)) {
        alert('You do not have permission to access this page.');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;