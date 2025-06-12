import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ColorModeContext, ThemeProvider } from '../components/Theme';
import axios from 'axios';

// Tampilan UI/UX//
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import { LockOpen } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';


const SiteLogoIcon = styled(LockOpen)(({ theme }) => ({
    fontSize: '3rem',
    alignSelf: 'center',
    color: theme.palette.primary.main,
}));

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        theme.palette.mode === 'light'
            ? 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px'
            : 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            theme.palette.mode === 'light'
                ? 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))'
                : 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        backgroundRepeat: 'no-repeat',
    },
}));

export default function SignIn() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [identifierError, setIdentifierError] = useState(false);
    const [identifierErrorMessage, setIdentifierErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [loginError, setLoginError] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const validateForm = () => {
        let isValid = true;

        if (!identifier.trim()) {
            setIdentifierError(true);
            setIdentifierErrorMessage('Tolong masukkan Nama Pengguna atau Email.');
            isValid = false;
        } else {
            setIdentifierError(false);
            setIdentifierErrorMessage('');
        }

        if (!password || password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password harus lebih dari 6 huruf.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginError('');

        if (!validateForm()) {
            return;
        }

        try {
            await login(identifier, password);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error.response?.data?.message || error.message);
            setLoginError(error.response?.data?.message || 'Login gagal. Silakan coba lagi.');
        }
    };

    return (
        <ThemeProvider>
            <SignInContainer direction="column" justifyContent="space-between">
                <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
                    <Button onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </Button>
                </Box>

                <Card variant="outlined">
                    <SiteLogoIcon />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="identifier">Nama Pengguna atau Email</FormLabel>
                            <TextField
                                required fullWidth
                                id="identifier"
                                type="text"
                                name="identifier"
                                placeholder="Nama Pengguna atau Email"
                                autoComplete="username"
                                variant="outlined"
                                error={identifierError}
                                helperText={identifierErrorMessage}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Masukkan Password</FormLabel>
                            <TextField
                                required fullWidth
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                variant="outlined"
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {loginError && (
                            <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                                {loginError}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            Sign in
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Tidak mempunyai akun?{' '}
                            <Link
                                component={RouterLink}
                                to="/signup"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignInContainer>
        </ThemeProvider>
    );
}