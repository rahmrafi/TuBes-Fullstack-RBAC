import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typoraphy, IconButton } from '@mui/material';
import { duration, styled } from '@mui/material/styles';
import MuiDrawer from '@mui/meterial/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easting: theme.transitions.easing.sharp,
        duration: theme.transitions.duration,
    }),
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    }
})

const AppBarStyled = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open',
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerStyled = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' }) (
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function Layout({ children, pageTitle }) {
    const [open, setOpen] = React.useState(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarStyled position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(!open)}
                        edge="start"
                        sx={{
                            marginRight: 5,
                        }}
                    >
                        {/* Icon untuk toggle sidebar */}
                        {/* <MenuIcon /> atau ChevronLeftIcon/ChevronRightIcon */}
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Pages / {pageTitle}
                    </Typography>
                    {/* Dark Mode Toggle */}
                    {/* <IconButton onClick={toggleDarkMode} color="inherit">
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton> */}
                    {/* User Avatar/Initials */}
                    <IconButton color="inherit">
                        {/* <Avatar sx={{ bgcolor: 'secondary.main' }}>AP</Avatar> */}
                    </IconButton>
                </Toolbar>
            </AppBarStyled>
            <DrawerStyled variant="permanent" open={open}>
                <DrawerHeader>
                    {/* Logo atau branding */}
                </DrawerHeader>
                <Sidebar />
            </DrawerStyled>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}> {/* mt: 8 untuk memberi ruang dari AppBar */}
                {children}
            </Box>
        </Box>
    );
}

export default Layout;