import React, { useContext } from 'react';
import { ColorModeContext } from './src/components/Theme'; // Import konteksnya
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Icon untuk mode gelap
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Icon untuk mode cerah
import { useTheme } from '@mui/material/styles'; // Untuk mendapatkan tema saat ini (mode)

function Header() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
}