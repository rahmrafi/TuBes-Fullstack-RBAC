import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fungsi untuk memuat user dari localStorage //
    const loadUserFromStorage = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 > Date.now()) {
                    setUser({
                        id: decodedToken.id,
                        username: decodedToken.username,
                        email: decodedToken.email,
                        role: decodedToken.role,
                        permissions: decodedToken.permissions
                    });
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } else {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        loadUserFromStorage();
    }, [loadUserFromStorage]);

    // Fungsi login //
    const login = async (identifier, password) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { identifier, password });
            const { token, user: userData } = response.data;

            localStorage.setItem('token', token);
            setUser(userData);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return true;
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    // Fungsi logout //
    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    // Fungsi untuk memeriksa role (sekarang user.role adalah string) //
    const hasRole = useCallback((requiredRole) => {
        return user && user.role === requiredRole;
    }, [user]);

    // Fungsi untuk memeriksa permission //
    const hasPermission = useCallback((requiredPermission) => {
        return user && user.permissions && user.permissions.includes(requiredPermission);
    }, [user]);


    return (
        <AuthContext.Provider value={{ user, loading, login, logout, hasRole, hasPermission }}>
            {children}
        </AuthContext.Provider>
    );
};