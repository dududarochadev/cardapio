import { createTheme } from '@mui/material';
import { pink } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: pink[700],
      dark: pink[800],
      light: '#fcedfc',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      dark: '#ffffff',
      light: '#ffffff',
      contrastText: '#010101',
    },
    background: {
      default: '#010101',
      paper: '#171717'
    }
  },
  typography: {
    allVariants: {
      color: 'white'
    }
  }
});