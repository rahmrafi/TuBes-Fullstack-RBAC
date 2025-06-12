// frontend/src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Pastikan Anda menginstal jwt-decode: npm install jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fungsi untuk memuat user dari localStorage
    const loadUserFromStorage = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // Cek apakah token masih valid
                if (decodedToken.exp * 1000 > Date.now()) {
                    // Pastikan struktur user sesuai dengan payload JWT backend
                    setUser({
                        id: decodedToken.id,
                        username: decodedToken.username,
                        email: decodedToken.email,
                        role: decodedToken.role, // Sekarang ini adalah STRING tunggal
                        permissions: decodedToken.permissions // Ini adalah ARRAY dari permissions
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

    // Fungsi login
    const login = async (identifier, password) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { identifier, password });
            const { token, user: userData } = response.data; // Backend mengirim 'user' sebagai 'userData' di sini

            localStorage.setItem('token', token);
            // Simpan userData yang sudah di-decode atau langsung dari respons backend jika strukturnya sama
            setUser(userData); // userData sudah memiliki { id, username, email, role, permissions }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return true;
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    // Fungsi logout
    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    // Fungsi untuk memeriksa role (sekarang user.role adalah string)
    const hasRole = useCallback((requiredRole) => {
        return user && user.role === requiredRole;
    }, [user]);

    // Fungsi untuk memeriksa permission
    const hasPermission = useCallback((requiredPermission) => {
        return user && user.permissions && user.permissions.includes(requiredPermission);
    }, [user]);


    return (
        <AuthContext.Provider value={{ user, loading, login, logout, hasRole, hasPermission }}>
            {children}
        </AuthContext.Provider>
    );
};