import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

import { Grid, Hidden, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import BaseLayout from '../../components/ui_layout/BaseLayout';
import Loading from '../../components/ui_layout/Loading';
import { GiThermometerCold, GiHeatHaze, GiWaterSplash } from 'react-icons/gi';
import { SiAirtable } from 'react-icons/si';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { FaLayerGroup } from 'react-icons/fa';
import {
  getBookingsById,
  getRentalById,
  getRentalOwner,
} from '../../redux/rentals_slice/rentalActions';
import Map from '../../components/Map';
import BookingReserve from '../../components/booking/BookingReserve.jsx';
import {
  CREATE_BOOKING_RESET,
  RENTAL_DETAILS_RESET,
} from '../../redux/rentals_slice/types';
import RentalInfo from './RentalInfo';
import cogoToast from 'cogo-toast';
import LoginProposal from '../../components/rentals/LoginProposal';
import YourPostingText from '../../components/rentals/YourPostingText';
import RentalBookingsList from '../../components/rentals/RentalBookingsList';
import OnwerDetailsSection from '../../components/rentals/OnwerDetailsSection';
import LocationInfo from '../../components/rentals/LocationInfo';

const useStyles = makeStyles(theme => ({
  '& .MuiGrid-root': {
    backgroundColor: 'red',
  },
  '& .MuiGrid-container': {
    backgroundColor: 'red',
  },
  imagesGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexGap: '2rem',
  },
  placeImage: {
    width: '80%',
    marginRight: '2rem',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      margin: '40px 10% 0 0',
    },
  },
  rentalMapComponent: {
    margin: '-20px 0 40px 0',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      marginLeft: '5%',
    },
  },
  bookrentalSection: {},
  location: {
    background: '#B4F0B9',
    width: '40vw',
    borderRadius: '.8em',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '1em',
    margin: '2rem 0',
    boxShadow: '0 0 0 .6em #3E3A7B',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.4rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      margin: '1.4rem 5%',
      fontSize: '1rem',
    },
  },
  description: {
    background: '#DCF9DF',
    color: '#3E3A7B',
    borderRadius: '.8em',
    padding: '1em',
    boxShadow: '0 0 0 .6em #3E3A7B',
    margin: '40px 10px',
  },
  assetsGrid: {
    display: 'grid',
    margin: '2rem 0 2rem',
    gridTemplateColumns: 'repeat(3,1fr)',
  },
  asset: {
    marginBottom: '20px',
    marginRight: '5px',
    backgroundColor: '#453C81',
    border: '2px solid gray',
    borderRadius: '10px',
    color: '#DCF9DF',
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
    transition: 'all .25s ease-in',
    '&:hover': {
      transform: 'translateY(-3px)',
      backgroundColor: '#27166E',
      color: 'yellow',
      boxShadow: '2px 4px 10px rgba(0,0,0,0.2)',
    },
  },
  contactPill: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    padding: '3px 5px',
    marginRight: 10,
    color: 'white',
  },
}));

const RentalDetails = ({ match }) => {
  const classes = useStyles();
  const rentalId = match.params.id;
  const dispatch = useDispatch();
  const { rentalByID, loading } = useSelector(state => state.rentalByID);
  const { userId } = useSelector(state => state.userLogin);
  const { loading: loadingBooking, success, error } = useSelector(
    state => state.booking,
  );
  const { bookings } = useSelector(state => state.bookingsByRentalID);
  const { owner } = useSelector(state => state.rentalOwner);
  const loginToken = localStorage.getItem('user-session-token');

  const isOwner = userId === rentalByID?.owner?._id;
  const ownerDetails = owner?.owner || null;

  let city, street, rentalLocation;
  if (rentalByID) {
    city = rentalByID.city;
    street = rentalByID.street;
    rentalLocation = `${city} ${street}`;
  }
  const tiltRef = useRef(null);

  useEffect(() => {
    if (error?.includes('overlaps')) cogoToast.error(error);
  }, [error]);

  useEffect(() => {
    if (success) {
      cogoToast.success('Booking has been created!');
    }
  }, [success]);

  useEffect(() => {
    const tiltedElement = tiltRef.current;

    VanillaTilt.init(tiltedElement, {
      max: 8,
      glare: true,
      perspective: 1000,
      scale: 1.04,
      speed: 300,
      axis: null,
      reset: true,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
    });
  });

  useEffect(() => {
    dispatch(getRentalById(rentalId));
    dispatch(getBookingsById(rentalId));
    dispatch(getRentalOwner(rentalId));
    return () => {
      dispatch({ type: RENTAL_DETAILS_RESET });
      dispatch({ type: CREATE_BOOKING_RESET });
    };
  }, [dispatch, rentalId]);

  if (loading || loadingBooking) {
    return <Loading size={50} loading={loading} />;
  }

  const assets = [
    { icon: <GiThermometerCold size={30} />, text: 'Cooling' },
    { icon: <GiHeatHaze size={30} />, text: 'Heating' },
    { icon: <FaLayerGroup size={30} />, text: 'Iron' },
    { icon: <SiAirtable size={30} />, text: 'Working Area' },
    { icon: <CgSmartHomeWashMachine size={30} />, text: 'Washing Machine' },
    { icon: <GiWaterSplash size={30} />, text: 'Dish Washer' },
  ];
  return (
    <BaseLayout>
      {rentalByID && (
        <Grid container direction='column'>
          <Typography variant='h2'>Rental Details</Typography>
          <Grid container className={classes.imagesGrid}>
            <Grid item md={6} sm={6}>
              <img
                ref={tiltRef}
                src={rentalByID.image}
                className={classes.placeImage}
                alt={rentalByID.title}
              />
            </Grid>
            <Hidden xsDown>
              <Grid item md={6} sm={6} lg={6}>
                <img
                  className={classes.placeImage}
                  src={rentalByID.image2}
                  alt={rentalByID.title}
                />
              </Grid>
            </Hidden>
          </Grid>
          <LocationInfo rentalByID={rentalByID} />
          <Grid container>
            <Grid item md={12}>
              {ownerDetails && (
                <OnwerDetailsSection
                  ownerDetails={ownerDetails}
                  rentalByID={rentalByID}
                />
              )}
            </Grid>
          </Grid>
          <Grid container justify='around' spacing={10}>
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              className={classes.rentalMapComponent}>
              {rentalLocation && <Map location={rentalLocation} />}
            </Grid>
            {loginToken !== null ? (
              !isOwner ? (
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  className={classes.bookrentalSection}>
                  <BookingReserve
                    rentalByID={rentalByID}
                    existingBookings={bookings}
                  />
                </Grid>
              ) : (
                <YourPostingText />
              )
            ) : (
              <LoginProposal />
            )}
          </Grid>
          {bookings && bookings.length > 0 && !isOwner ? (
            <RentalBookingsList bookings={bookings} />
          ) : (
            <Typography variant='h3'>
              Location has no active Bookings! Take an advantage!
            </Typography>
          )}
          <RentalInfo
            rentalByID={rentalByID}
            classes={classes}
            assets={assets}
          />
        </Grid>
      )}
    </BaseLayout>
  );
};

export default RentalDetails;
