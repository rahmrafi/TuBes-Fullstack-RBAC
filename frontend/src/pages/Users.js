// frontend/src/pages/Users.js
import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const { hasPermission, hasRole } = useContext(AuthContext); // Dapatkan fungsi pengecekan izin/peran

    useEffect(() => {
        // Fetch users from backend (pastikan endpoint ini dilindungi di backend)
        const fetchUsers = async () => {
            try {
                // Pastikan token terkirim via header Authorization
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                // Handle error, e.g., redirect to login if unauthorized
            }
        };

        if (hasRole('admin')) { // Hanya fetch jika user adalah admin
            fetchUsers();
        }
    }, [hasRole]);

    const handleAddUser = () => {
        // Navigasi ke halaman tambah user atau buka modal
        console.log('Add User clicked');
    };

    const handleEditUser = (userId) => {
        console.log('Edit User:', userId);
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}`);
                setUsers(users.filter(user => user.id !== userId));
                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">
                    Users
                </Typography>
                {hasPermission('create_user') && ( // Contoh: hanya tampil jika punya izin create_user
                    <Button variant="contained" onClick={handleAddUser}>
                        Add User
                    </Button>
                )}
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="users table">
                    <TableHead>
                        <TableRow>
                            <TableCell>NAME</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>ROLE</TableCell>
                            <TableCell>PERMISSIONS</TableCell> {/* Ini akan jadi daftar izin spesifik */}
                            <TableCell>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.name || user.username}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.roles ? user.roles.join(', ') : 'N/A'}</TableCell>
                                <TableCell>
                                    {/* Tampilkan centang untuk izin baca/tulis/hapus, dll. */}
                                    {/* Ini akan lebih kompleks, mungkin butuh komponen sendiri */}
                                    {user.permissions && user.permissions.includes('read') && '✔ read '}
                                    {user.permissions && user.permissions.includes('write') && '✔ write '}
                                    {user.permissions && user.permissions.includes('delete') && '✔ delete '}
                                    {/* Atau tampilkan daftar izin */}
                                </TableCell>
                                <TableCell>
                                    {hasPermission('edit_user') && (
                                        <IconButton onClick={() => handleEditUser(user.id)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    {hasPermission('delete_user') && (
                                        <IconButton onClick={() => handleDeleteUser(user.id)} sx={{ color: 'error.main' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default UsersPage;