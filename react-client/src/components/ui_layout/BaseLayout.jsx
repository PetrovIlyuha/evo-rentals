import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    paddingTop: '8rem',
    marginTop: '-2rem',
    height: '100%',
    backgroundColor: 'rgba(240, 240, 245,.4)',
    backgroundImage:
      'radial-gradient(rgba(68, 76, 247, 0.15) 1px, transparent 1px), radial-gradient(rgba(68, 76, 247, 0.15) 1px, rgba(229, 229, 247, 0.3) 1px)',
    backgroundSize: '40px 40px',
    backgroundPosition: '0 0,20px 20px',
  },
}));

const BaseLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg' className={classes.mainContainer}>
        {children}
      </Container>
    </>
  );
};

export default BaseLayout;
