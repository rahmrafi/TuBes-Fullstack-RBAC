import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password });
        if (response.data.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            return {
                token: response.data.token,
                username: response.data.username,
                roles: response.data.roles
            };
        }
        return null;
    } catch (error) {
        console.error('Login error:', error.response?.data?.message || error.message);
        throw error;
    }
};

const logout = () => {
    delete axios.defaults.headers.common['Authorization'];
};

const authService = {
    login,
    logout,
};

export default authService;