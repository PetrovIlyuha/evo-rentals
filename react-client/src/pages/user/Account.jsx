import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseLayout from '../../components/ui_layout/BaseLayout';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import RentalDeleteModal from '../../components/booking/RentalDeleteModal';
import RentalCard from '../rentals/RentalCard';

import {
  getBookingsReceived,
  showMyBookings,
  showMyRentals,
} from '../../redux/rentals_slice/rentalActions';
import Loading from '../../components/ui_layout/Loading';
import {
  Box,
  Button,
  Hidden,
  IconButton,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import ActiveBookingsList from '../../components/booking/ActiveBookingsTable';
import BookingsStats from '../../components/booking/BookingsStats';

const useStyles = makeStyles(theme => ({
  headingAccount: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
  },
}));

const Account = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rentals, loading } = useSelector(
    state => state.activeUserRentalsList,
  );
  const { userId, username } = useSelector(state => state.userLogin);
  const { bookings } = useSelector(state => state.authUserBookings);
  const { bookingsIncoming } = useSelector(state => state.bookingsReceived);
  const theme = useTheme();
  const matchesSmallScreens = useMediaQuery(theme.breakpoints.down('sm'));

  const [show, setShow] = useState(true);

  const [openRentalDeteleModal, setOpenRentalDeteleModal] = useState();
  const [rentalForDeletion, setRentalForDeletion] = useState({});
  useEffect(() => {
    dispatch(showMyRentals(userId));
    dispatch(showMyBookings(userId));
    dispatch(getBookingsReceived());
  }, [userId, dispatch]);

  if (loading) {
    return <Loading size='50px' loading={loading} />;
  }

  return (
    <BaseLayout>
      <Grid container justify='center' align='center' spacing={3}>
        <Hidden smDown>
          <Grid item md={8}>
            <Typography variant='h2'>{username}'s Dashboard</Typography>
          </Grid>
        </Hidden>
        <Grid item md={12}>
          <Typography variant='h2' className={classes.headingAccount}>
            My Posted Rentals
          </Typography>
          <Button
            variant='contained'
            color='primary'
            style={{
              width: matchesSmallScreens ? 40 : 100,
              height: matchesSmallScreens ? 20 : 30,
            }}
            onClick={() => setShow(state => !state)}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </Grid>
        {rentals?.length > 0 &&
          show &&
          rentals.map((rental, index) => {
            return (
              <Grid item lg={3} md={3} sm={6} xs={6} key={index}>
                <RentalCard rental={rental} />
                <IconButton
                  aria-label='delete'
                  style={{
                    marginLeft: '80%',
                    fontSize: '1.8rem',
                    color: 'red',
                  }}
                  size='small'>
                  <Tooltip title='Remove posting?'>
                    <DeleteIcon
                      fontSize='inherit'
                      onClick={() => {
                        setOpenRentalDeteleModal(true);
                        setRentalForDeletion(rental);
                      }}
                    />
                  </Tooltip>
                </IconButton>
              </Grid>
            );
          })}
      </Grid>
      <Grid
        container
        style={{ marginTop: 30 }}
        justify='center'
        align='center'
        spacing={2}>
        {bookingsIncoming?.length > 0 && (
          <Grid item md={12}>
            <Typography variant='h2'>Bookings Received</Typography>
          </Grid>
        )}
        {bookingsIncoming?.length > 0 && (
          <>
            <Grid item md={10}>
              <Typography variant='h4' style={{ marginBottom: 10 }}>
                Statistics Overview
              </Typography>
              <BookingsStats incomingBookings={bookingsIncoming} />
            </Grid>
            <Grid item lg={10} md={10} xs={10} sm={10}>
              <Box margin={3}>
                <Typography variant='h4' style={{ marginBottom: 10 }}>
                  Active bookings for your postings
                </Typography>
                <ActiveBookingsList bookings={bookingsIncoming} />
              </Box>
            </Grid>
          </>
        )}
      </Grid>
      {bookings?.length > 0 && (
        <Grid container justify='center' align='center' spacing={3}>
          <Grid item md={12}>
            <Typography variant='h2'>My Bookings</Typography>
          </Grid>
          <Grid item lg={10} md={10} xs={10} sm={10}>
            <Box margin={3}>
              <ActiveBookingsList bookings={bookings} placedByMe={true} />
            </Box>
          </Grid>
        </Grid>
      )}
      {rentalForDeletion && (
        <RentalDeleteModal
          setOpenRentalDeteleModal={setOpenRentalDeteleModal}
          openRentalDeleteModal={openRentalDeteleModal}
          rental={rentalForDeletion}
        />
      )}
    </BaseLayout>
  );
};

export default Account;
