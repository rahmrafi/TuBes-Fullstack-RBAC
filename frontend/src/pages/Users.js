import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import MuiDataTable from '../components/Table';
import { userColumns } from '../components/Table';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const { hasPermission, hasRole } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        if (hasRole('admin')) {
            fetchUsers();
        }
    }, [hasRole]);

    const handleAddUser = () => {
        console.log('Add User clicked');
    };

    const columnsWithActions = [
        ...userColumns,
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box>
                    {hasPermission('edit_user') && (
                        <Button size="small" onClick={() => console.log('Edit', params.row.id)}>Edit</Button>
                    )}
                    {hasPermission('delete_user') && (
                        <Button size="small" color="error" onClick={() => console.log('Delete', params.row.id)}>Delete</Button>
                    )}
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">
                    Users
                </Typography>
                {hasPermission('create_user') && (
                    <Button variant="contained" onClick={handleAddUser}>
                        Add User
                    </Button>
                )}
            </Box>

            <MuiDataTable rows={users} columns={columnsWithActions} />
        </Box>
    );

}

export default UsersPage;