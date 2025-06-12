// frontend/src/components/Theme.js
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { teal, grey } from "@mui/material/colors";
import React, { createContext, useState, useMemo } from 'react';
import { CssBaseline } from '@mui/material';


export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem('themeMode');
    return storedMode || 'light';
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  // Anda bisa menghapus useEffect di sini jika mode sudah diinisialisasi dari localStorage
  // dan di-update di toggleColorMode.
  // useEffect(() => {
  //   // Ini bisa digunakan jika Anda ingin membaca dari sistem preferensi warna user
  //   // atau jika Anda ingin membaca dari localStorage hanya sekali setelah render awal
  //   const storedMode = localStorage.getItem('themeMode');
  //   if (storedMode) {
  //     setMode(storedMode);
  //   }
  // }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // 'light' or 'dark'
          primary: {
            main: mode === 'light' ? teal[500] : teal[200],
          },
          secondary: {
            main: mode === 'light' ? grey[900] : grey[500],
          },
          background: {
            default: mode === 'light' ? '#f0f2f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        typography: {
            fontFamily: 'Roboto, sans-serif',
            h4: {
              fontWeight: 600,
            },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ThemeProvider;