import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: [
      "Rajdhani"
    ].join(','),
  },
});

export default lightTheme;