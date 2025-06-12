// frontend/src/pages/Dashboard.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

// MUI Imports
import {
    Box,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    CssBaseline,
    Stack,
    Grid,
    Card,
    CardContent
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics'; // Untuk Data
import HistoryIcon from '@mui/icons-material/History'; // Untuk Log Aktivitas
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Untuk Sign Out
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';


const drawerWidth = 240;

const MainContent = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function Dashboard() {
    const { user, logout, hasRole } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null); // For user menu

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/signin'); // Arahkan ke halaman login setelah logout
        handleClose();
    };

    // Fungsi untuk mendapatkan nama halaman dari path
    const getPageTitle = (path) => {
        switch (path) {
            case '/dashboard':
                return 'Dashboard';
            case '/dashboard/users':
                return 'Manajemen Pengguna';
            case '/dashboard/data':
                return 'Data Umum';
            case '/dashboard/log-aktivitas':
                return 'Log Aktivitas';
            default:
                return 'Dashboard';
        }
    };

    if (!user) {
        // Ini akan sangat singkat karena biasanya ada PrivateRoutes atau Logic di App.js
        return <Typography variant="h6">Anda tidak memiliki akses ke halaman ini. Silakan login.</Typography>;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarStyled position="fixed" open={openDrawer}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ marginRight: 2, ...(openDrawer && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {getPageTitle(location.pathname)}
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profil</MenuItem>
                            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBarStyled>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={openDrawer}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding component={RouterLink} to="/dashboard">
                        <ListItemButton selected={location.pathname === '/dashboard'}>
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>

                    {/* Hanya tampilkan 'Users' jika user adalah admin */}
                    {hasRole('admin') && (
                        <ListItem disablePadding component={RouterLink} to="/dashboard/users">
                            <ListItemButton selected={location.pathname === '/dashboard/users'}>
                                <ListItemIcon><PeopleIcon /></ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                        </ListItem>
                    )}

                    <ListItem disablePadding component={RouterLink} to="/dashboard/data">
                        <ListItemButton selected={location.pathname === '/dashboard/data'}>
                            <ListItemIcon><AnalyticsIcon /></ListItemIcon>
                            <ListItemText primary="Data" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding component={RouterLink} to="/dashboard/log-aktivitas">
                        <ListItemButton selected={location.pathname === '/dashboard/log-aktivitas'}>
                            <ListItemIcon><HistoryIcon /></ListItemIcon>
                            <ListItemText primary="Log Aktivitas" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={handleLogout}>
                        <ListItemButton>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Sign Out" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <MainContent open={openDrawer}>
                <DrawerHeader /> {/* Spacer agar konten tidak tertutup AppBar */}
                <Box>
                    <Typography variant="body1" color="text.secondary">
                        pages/{getPageTitle(location.pathname).toLowerCase().replace(/\s/g, '-')}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        {getPageTitle(location.pathname)}
                    </Typography>

                    {/* Bagian Dashboard Content */}
                    {location.pathname === '/dashboard' && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            Selamat datang, {user.username}!
                                        </Typography>
                                        <Typography variant="body1">Nama: {user.username}</Typography>
                                        <Typography variant="body1">Email: {user.email}</Typography>
                                        <Typography variant="body1">Role: {user.role}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            {/* Card untuk Jumlah Users (Placeholder) */}
                            <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            Jumlah Pengguna
                                        </Typography>
                                        {/* Ini akan memerlukan API call ke backend untuk mendapatkan jumlah user */}
                                        <Typography variant="h4">XX</Typography> {/* Placeholder */}
                                        <Typography variant="body2" color="text.secondary">
                                            Total pengguna terdaftar
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    )}

                    {/* Placeholder untuk halaman lain (Users, Data, Log Aktivitas) */}
                    {location.pathname === '/dashboard/users' && hasRole('admin') && (
                        <Typography variant="h5">Halaman Manajemen Pengguna (khusus Admin)</Typography>
                    )}
                     {location.pathname === '/dashboard/data' && (
                        <Typography variant="h5">Halaman Data Umum</Typography>
                    )}
                     {location.pathname === '/dashboard/log-aktivitas' && (
                        <Typography variant="h5">Halaman Log Aktivitas</Typography>
                    )}
                </Box>
            </MainContent>
        </Box>
    );
}

export default Dashboard;