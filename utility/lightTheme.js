import { createTheme } from '@mui/material/styles';

const fontFamilies = {
  primary: 'Rajdhani, sans-serif',
  secondary: 'Nunito Sans, sans-serif'
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: [fontFamilies.primary, "Rajdhani"].join(','),
    h1: {
      fontSize: '4rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '3.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '3.0rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '2.0rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      fontFamily: fontFamilies.secondary,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily: fontFamilies.secondary,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      fontFamily: fontFamilies.secondary,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily: fontFamilies.secondary,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      fontFamily: fontFamilies.secondary,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    overline: {
      fontSize: '0.625rem',
      fontWeight: 400,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  }, 
});

export default lightTheme;