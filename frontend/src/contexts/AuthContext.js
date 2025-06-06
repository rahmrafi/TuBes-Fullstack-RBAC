import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const userData = await authService.login(username, password);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        authService.logout();
    };

    const hasRole = (roles) => {
        if (!user || !user.roles) return false;
        if (Array.isArray(roles)) {
            return roles.some(role => user.roles.includes(role));
        }
        return user.roles.includes(roles);
    };

    const hasPermission = (permission) => {
        return user && user.roles && user.roles.includes('admin');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole, hasPermission, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};