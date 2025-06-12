// frontend/src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import ThemeProvider from 'components/Theme';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import Dashboard from './pages/Dashboard';
// Import pages yang akan ada di dashboard
// import UsersPage from './pages/UsersPage';
// import DataPage from './pages/DataPage';
// import LogAktivitasPage from './pages/LogAktivitasPage';

// Komponen PrivateRoute untuk melindungi route
const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading, hasRole } = useContext(AuthContext);

    if (loading) {
        return <div>Loading authentication...</div>; // Atau spinner
    }

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const userHasAllowedRole = allowedRoles.some(role => hasRole(role));
        if (!userHasAllowedRole) {
            // Jika user tidak memiliki role yang diizinkan, arahkan ke dashboard atau halaman 403
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

                        {/* Route Dashboard utama */}
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute allowedRoles={['admin', 'user']}> {/* Hanya admin atau user yang bisa akses dashboard */}
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        {/* Sub-route Dashboard */}
                        <Route
                            path="/dashboard/users"
                            element={
                                <PrivateRoute allowedRoles={['admin']}> {/* Hanya admin yang bisa akses halaman users */}
                                    {/* <UsersPage /> */} {/* Ganti dengan komponen UsersPage Anda */}
                                    <Dashboard /> {/* Untuk demo, gunakan Dashboard sebagai placeholder */}
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/dashboard/data"
                            element={
                                <PrivateRoute allowedRoles={['admin', 'user']}> {/* Semua user bisa akses data */}
                                    {/* <DataPage /> */}
                                    <Dashboard /> {/* Untuk demo, gunakan Dashboard sebagai placeholder */}
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/dashboard/log-aktivitas"
                            element={
                                <PrivateRoute allowedRoles={['admin']}> {/* Hanya admin yang bisa akses log */}
                                    {/* <LogAktivitasPage /> */}
                                    <Dashboard /> {/* Untuk demo, gunakan Dashboard sebagai placeholder */}
                                </PrivateRoute>
                            }
                        />

                        {/* Redirect default ke signin jika tidak ada path yang cocok */}
                        <Route path="*" element={<Navigate to="/signin" replace />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;