import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import ScienceIcon from '@mui/icons-material/Science';
import { AuthContext } from '/src/contexts/AuthContext';

const sidebarItems = [
    { text: 'Main Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users', roles: ['admin'] },
    { text: 'Roles', icon: <LockIcon />, path: '/roles', roles: ['admin'] },
    { text: 'Permissions', icon: <SecurityIcon />, path: '/permissions', roles: ['admin'] },
    { text: 'Log', icon: <AssignmentIcon />, path: '/log', roles: ['admin'] },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Test Feat', icon: <ScienceIcon />, path: '/test-feat', roles: ['admin'] }
]

function Sidebar() {
    const { hasRole } = useContext(AuthContext);

    return (
        <Box sx={{ width: 240, height: '100vh', bgcolor: '#f0f2f5', p: 2 }}>
            <List>
                {sidebarItems.map((item) =>(
                    (!item.roles || hasRole(item.roles)) && (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={link} to={item.path}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItemButton>
                        </ListItem>
                    )
                ))}
            </List>
        </Box>
    )
}

export default Sidebar;