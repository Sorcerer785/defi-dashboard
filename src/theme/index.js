import { createTheme } from '@mui/material/styles';

const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4',
      light: '#4dd0e1',
      dark: '#0097a7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0A1929',
      paper: '#132f4c',
      darker: '#051e3c',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b2bac2',
    },
    divider: 'rgba(194, 224, 255, 0.08)',
    success: {
      main: '#00c853',
      light: '#69f0ae',
      dark: '#00963f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      background: 'linear-gradient(45deg, #00bcd4 30%, #4dd0e1 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#00bcd4 #132f4c',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#00bcd4',
            border: '2px solid #132f4c',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            borderRadius: 8,
            backgroundColor: '#132f4c',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#132f4c',
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(194, 224, 255, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,188,212,0.3)',
          },
        },
        outlined: {
          borderColor: '#00bcd4',
          '&:hover': {
            backgroundColor: 'rgba(0,188,212,0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundImage: 'none',
          backgroundColor: '#132f4c',
          '&:hover': {
            boxShadow: '0 8px 24px 0 rgba(0,188,212,0.2)',
          },
          transition: 'box-shadow 0.3s ease-in-out',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
        filled: {
          backgroundColor: 'rgba(0,188,212,0.1)',
          '&:hover': {
            backgroundColor: 'rgba(0,188,212,0.2)',
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(194, 224, 255, 0.08)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#051e3c',
          color: '#00bcd4',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: 'rgba(194, 224, 255, 0.03)',
          },
          '&:hover': {
            backgroundColor: 'rgba(0,188,212,0.08) !important',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#132f4c',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(194, 224, 255, 0.08)',
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardSuccess: {
          backgroundColor: 'rgba(0,200,83,0.1)',
          color: '#69f0ae',
        },
        standardError: {
          backgroundColor: 'rgba(244,67,54,0.1)',
          color: '#e57373',
        },
        standardWarning: {
          backgroundColor: 'rgba(255,167,38,0.1)',
          color: '#ffb74d',
        },
        standardInfo: {
          backgroundColor: 'rgba(41,182,246,0.1)',
          color: '#4fc3f7',
        },
      },
    },
  },
};

const lightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00bcd4',
      light: '#4dd0e1',
      dark: '#0097a7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
      darker: '#e0e0e0',
    },
    text: {
      primary: '#1a2027',
      secondary: '#637381',
    },
  },
};

export const getTheme = (mode) => {
  return createTheme(mode === 'dark' ? darkTheme : lightTheme);
};

export const defaultTheme = 'light';
