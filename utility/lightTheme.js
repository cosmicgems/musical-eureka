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
    fontFamily: ["Rajdhani"].join(','),}
});

export default lightTheme;