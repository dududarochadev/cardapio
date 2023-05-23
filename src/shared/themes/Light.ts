import { createTheme } from '@mui/material';
import { pink } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: pink[700],
      dark: pink[800],
      light: pink[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#010101',
      dark: '#010101',
      light: '#010101',
      contrastText: '#ffffff',
    },
    background: {
      default: '#e8e8e8',
      paper: '#ffffff'
    }
  },
  typography: {
    allVariants: {
      color: 'black'
    }
  }
});