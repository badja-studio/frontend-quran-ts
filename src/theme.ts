import { createTheme } from '@mui/material/styles';

const getColorFromEnv = (key: string, defaultValue: string): string => {
  return import.meta.env[key] || defaultValue;
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: getColorFromEnv('VITE_PRIMARY_COLOR', '#2E7D32'), // Islamic Green
      light: getColorFromEnv('VITE_PRIMARY_LIGHT', '#4CAF50'),
      dark: getColorFromEnv('VITE_PRIMARY_DARK', '#1B5E20'),
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: getColorFromEnv('VITE_SECONDARY_COLOR', '#388E3C'),
      light: '#66BB6A',
      dark: '#2E7D32',
      contrastText: '#FFFFFF',
    },
    background: {
      default: getColorFromEnv('VITE_BACKGROUND_COLOR', '#FFFFFF'),
      paper: getColorFromEnv('VITE_PAPER_COLOR', '#F5F5F5'),
    },
    text: {
      primary: '#1B5E20',
      secondary: '#2E7D32',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
      'Amiri', // For Arabic text
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#1B5E20',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1B5E20',
    },
    body1: {
      fontSize: '1rem',
      color: '#2E7D32',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(46, 125, 50, 0.1)',
        },
      },
    },
  },
});

export default theme;
