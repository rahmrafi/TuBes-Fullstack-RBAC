import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ColorModeContext, ThemeProvider } from '../components/Theme';
import axios from 'axios';

// Tampilan UI/UX //
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled, useTheme } from '@mui/material/styles';
import { PersonAdd } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MenuItem, Select } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';


const SiteLogoIcon = styled(PersonAdd)(({ theme }) => ({
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
    boxShadow:
        theme.palette.mode === 'light'
            ? 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px'
            : 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');

    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    const [registerError, setRegisterError] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const validateForm = () => {
        let isValid = true;

        if (!username || username.trim().length < 3) {
            setUsernameError(true);
            setUsernameErrorMessage('Nama pengguna harus minimal 3 karakter.');
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage('');
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Tolong masukkan email yang valid.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password || password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password harus lebih dari 6 karakter.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorMessage('Konfirmasi password tidak cocok.');
            isValid = false;
        } else {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setRegisterError('');

        if (!validateForm()) {
            return;
        }

        try {
            const payload = {
                username: username,
                email: email,
                password: password,
                role: role
            };

            // Mengirim ke satu endpoint registrasi: /auth/register //
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, payload);
            console.log("API Response:", response.data);

            alert('Pendaftaran berhasil! Silakan login.');
            navigate('/signin');

        } catch (error) {
            console.error('Registration error:', error.response?.data?.message || error.message);
            setRegisterError(error.response?.data?.message || 'Pendaftaran gagal. Silakan coba lagi.');
        }
    };

    return (
        <ThemeProvider>
            <SignUpContainer direction="column" justifyContent="space-between">
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
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <FormControl fullWidth>
                            <FormLabel htmlFor='role-select'>Pilih Role</FormLabel>
                            <Select
                                required
                                id='role-select'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="username">Masukkan Nama</FormLabel>
                            <TextField
                                required
                                fullWidth
                                autoComplete="username"
                                name="username"
                                id="username"
                                placeholder="Username"
                                error={usernameError}
                                helperText={usernameErrorMessage}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="email">Masukkan Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                type="email"
                                placeholder="Email"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                error={emailError}
                                helperText={emailErrorMessage}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="password">Masukkan Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="confirm-password">Konfirmasi Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="confirm-password"
                                placeholder="••••••"
                                type="password"
                                id="confirm-password"
                                autoComplete="new-password"
                                variant="outlined"
                                error={confirmPasswordError}
                                helperText={confirmPasswordErrorMessage}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>

                        {registerError && (
                            <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                                {registerError}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            Sign up
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Sudah mempunyai akun?{' '}
                            <Link
                                component={RouterLink}
                                to="/signin"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignUpContainer>
        </ThemeProvider>
    );
}