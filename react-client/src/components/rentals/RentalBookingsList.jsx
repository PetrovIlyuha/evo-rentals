import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import ExistingBookingsByLocation from '../booking/ExistingBookingsByLocation';

const RentalBookingsList = ({ bookings }) => {
  return (
    <Grid container spacing={10} style={{ marginBottom: 49 }}>
      <Grid item lg={10} md={10}>
        <Typography variant='h4' style={{ marginBottom: 20 }}>
          This location active bookings
        </Typography>
        <ExistingBookingsByLocation
          style={{ width: '120%', minHeight: '350px' }}
          bookings={bookings}
        />
      </Grid>
    </Grid>
  );
};

export default RentalBookingsList;
