// frontend/src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import ThemeProvider from 'components/Theme';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/Users';


const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading, hasRole } = useContext(AuthContext);

    if (loading) {
        return <div>Loading authentication...</div>;
    }

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const userHasAllowedRole = allowedRoles.some(role => hasRole(role));
        if (!userHasAllowedRole) {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return children;
};

function App() {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute allowedRoles={['admin', 'user']}>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="pages/users"
                            element={
                                <PrivateRoute allowedRoles={['admin', 'user']}>
                                    <UsersPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="pages/data"
                            element={
                                <PrivateRoute allowedRoles={['admin', 'user']}>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="pages/log-aktivitas"
                            element={
                                <PrivateRoute allowedRoles={['admin', 'user']}>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/signin" replace />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;