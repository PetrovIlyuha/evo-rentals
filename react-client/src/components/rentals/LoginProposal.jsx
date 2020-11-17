import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const LoginProposal = () => {
  return (
    <Grid
      item
      lg={6}
      md={6}
      sm={12}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <Typography variant='h3'>
        Please <Link to='/login'>Login</Link> or{' '}
        <Link to='/register'>Register</Link> new account to book any location!{' '}
        <br /> No Email Confirmation! <br /> Takes less than a minute!
      </Typography>
    </Grid>
  );
};

export default LoginProposal;
