import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseLayout from '../../components/ui_layout/BaseLayout';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

import RentalCard from '../rentals/RentalCard';

import {
  showMyBookings,
  showMyRentals,
} from '../../redux/rentals_slice/rentalActions';
import Loading from '../../components/ui_layout/Loading';
import { Box, Button, Typography } from '@material-ui/core';
import ActiveBookingsList from '../../components/booking/ActiveBookingsTable';

const useStyles = makeStyles(theme => ({
  globeContainer: {
    marginTop: '-4rem',
    marginBottom: '2rem',
  },
  globe: {
    height: '20vh',
  },
}));
const Account = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rentals, loading } = useSelector(
    state => state.activeUserRentalsList,
  );
  const { userId } = useSelector(state => state.userLogin);
  const { bookings } = useSelector(state => state.authUserBookings);

  const [show, setShow] = useState(true);
  useEffect(() => {
    dispatch(showMyRentals(userId));
    dispatch(showMyBookings(userId));
  }, [userId, dispatch]);

  if (loading) {
    return <Loading size='50px' loading={loading} />;
  }

  return (
    <BaseLayout>
      <Grid container justify='center' align='center' spacing={3}>
        <Grid item spacing={4} md={12}>
          <Typography variant='h2'>My Posted Rentals</Typography>
          <Button
            variant='contained'
            color='primary'
            style={{ width: 100 }}
            onClick={() => setShow(state => !state)}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </Grid>
        {rentals &&
          show &&
          rentals.map((rental, index) => {
            return (
              <Grid item lg={3} md={3} xs={12} sm={6} key={index}>
                <RentalCard rental={rental} />
              </Grid>
            );
          })}
      </Grid>
      <Grid container justify='center' align='center' spacing={3}>
        <Grid item spacing={4} md={12}>
          <Typography variant='h2'>My Bookings</Typography>
        </Grid>
        <Grid item lg={10} md={10} xs={10} sm={10}>
          <Box margin={3}>
            <ActiveBookingsList bookings={bookings} />
          </Box>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default Account;