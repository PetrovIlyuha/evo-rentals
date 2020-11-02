import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  mainContainer: { marginTop: '8rem' },
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
