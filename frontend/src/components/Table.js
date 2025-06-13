import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


export const userColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'type', headerName: 'Type', width: 100 },
    {
        field: 'roles',
        headerName: 'Roles',
        width: 150,
        valueGetter: (params) => params.row.roles ? params.row.roles.join(', ') : '',
    },
    {
        field: 'permissions',
        headerName: 'Permissions (Sample)',
        width: 250,
        valueGetter: (params) => params.row.permissions ? params.row.permissions.slice(0, 3).join(', ') + '...' : '',
    },
];

// Kolom untuk Permissions (di halaman Permissions.js) //
export const permissionColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Permission Name', width: 250 },
    { field: 'description', headerName: 'Description', flex: 1 },
];

// Kolom untuk Roles (di halaman Roles.js) //
export const roleColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Role Name', width: 200 },
];

// Kolom untuk Log (di halaman Log.js) //
export const logColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'timestamp', headerName: 'Timestamp', width: 180 },
    { field: 'action', headerName: 'Action', width: 200 },
    { field: 'userId', headerName: 'User ID', width: 100 },
    { field: 'details', headerName: 'Details', flex: 1 },
];


const paginationModel = { page: 0, pageSize: 5 };

// Komponen DataGrid yang reusable //
export default function MuiDataTable({ rows, columns, pageSizeOptions = [5, 10], checkboxSelection = true }) {
  return (
    <Paper sx={{ height: 400, width: '100%', boxShadow: 3, borderRadius: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        sx={{
          border: 0,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e0e0e0',
          },
        }}
      />
    </Paper>
  );
}