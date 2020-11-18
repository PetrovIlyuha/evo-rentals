import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { GiBed } from 'react-icons/gi';
import { IoIosPerson } from 'react-icons/io';
import { FaStoreAlt } from 'react-icons/fa';

const useStyles = makeStyles(theme => ({
  rentalRoomInfo: {
    display: 'flex',
    width: '40%',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    padding: '2.4rem',
    backgroundColor: '#111f64',
    backgroundImage:
      'linear-gradient(45deg, #111f64 0%, #C850C0 46%, #FFCC70 100%)',
    color: '#B4F0B9',
    marginTop: '2rem',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
      height: '100px',
    },
  },
}));

const LocationInfo = ({ rentalByID }) => {
  const classes = useStyles();
  return (
    <Grid item>
      <Grid container>
        <div className={classes.rentalRoomInfo}>
          <Grid item lg={4} md={4} sm={4}>
            <Typography varinant='body2'>
              <GiBed size={40} />
              {rentalByID.numOfBeds} {rentalByID.numOfBeds > 1 ? 'Beds' : 'Bed'}
            </Typography>
          </Grid>
          <Grid item lg={4} md={4} sm={4}>
            <Typography varinant='body2'>
              <IoIosPerson size={40} /> {rentalByID.numOfGuests} Guests
            </Typography>
          </Grid>
          <Grid item lg={4} md={4} sm={4}>
            <Typography varinant='body2'>
              <FaStoreAlt size={40} /> {rentalByID.numOfRooms} Rooms
            </Typography>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default LocationInfo;
