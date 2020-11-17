import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const YourPostingText = () => {
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
      <Typography variant='h3'>Your posting</Typography>
    </Grid>
  );
};

export default YourPostingText;
