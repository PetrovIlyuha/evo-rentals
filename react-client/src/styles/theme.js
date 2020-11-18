import { createMuiTheme } from '@material-ui/core/styles';

const techViolet = '#0F0E4B';
const techBlue = '#5C4DD5';
const techYellow = '#CBDC64';
const darkYellow = '#85C24F';
const lightPaleBlue = '#E9EBF8';

export default createMuiTheme({
  palette: {
    common: {
      lightBg: `${lightPaleBlue}`,
      darkBlue: `${techViolet}`,
      lightBlue: `${techBlue}`,
      lightYellow: `${techYellow}`,
      darkYellow: `${darkYellow}`,
    },
    primary: {
      main: `${techViolet}`,
    },
    secondary: { main: `${techYellow}` },
  },
  typography: {
    tab: {
      fontFamily: 'Poppins',
      textTransform: 'none',
      fontWeight: '700',
      fontSize: '1rem',
    },
    h2: {
      fontFamily: 'Righteous',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: `${techBlue}`,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: 'Poppins',
      fontWeight: 500,
      fontSize: '2rem',
      color: `${techBlue}`,
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: '1.7rem',
      color: `${techBlue}`,
      lineHeight: 1.1,
    },
    basicButton: {
      fontFamily: 'Righteous',
      fontSize: '1rem',
      textTransform: 'none',
      color: '#316111',
      background: '#2AD683',
    },
  },
});
