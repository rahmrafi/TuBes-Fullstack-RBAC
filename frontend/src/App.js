import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import MainDashboard from './pages/MainDashboard';
import UsersPage from './pages/Users';
import RolesPage from './pages/Roles';
import PermissionsPage from './pages/Permissions';
import LogPage from './pages/Log';
import ProfilePage from './pages/Profile';
import TestFeatPage from './pages/TestFeat';


function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Routes yang tidak menggunakan layout (misalnya Login, Register) */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />

                    {/* Routes yang menggunakan layout dan dilindungi */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Layout pageTitle="Main Dashboard">
                                    <MainDashboard />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute requiredRoles={['admin']}>
                                <Layout pageTitle="Users">
                                    <UsersPage />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                     <Route
                        path="/roles"
                        element={
                            <PrivateRoute requiredRoles={['admin']}>
                                <Layout pageTitle="Roles">
                                    <RolesPage />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                     <Route
                        path="/permissions"
                        element={
                            <PrivateRoute requiredRoles={['admin']}>
                                <Layout pageTitle="Permissions">
                                    <PermissionsPage />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                     <Route
                        path="/log"
                        element={
                            <PrivateRoute requiredRoles={['admin']}>
                                <Layout pageTitle="Log">
                                    <LogPage />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                     <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Layout pageTitle="Profile">
                                    <ProfilePage />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/test-feat"
                        element={
                            <PrivateRoute requiredRoles={['admin', 'dev']}>
                                <Layout pageTitle="Test Feat">
                                    <TestFeatPage />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    {/* Redirect ke halaman login jika rute tidak ditemukan dan tidak diautentikasi */}
                    {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;