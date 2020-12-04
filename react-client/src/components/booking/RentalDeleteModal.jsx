import React, { useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { firstUpperLetter } from '../../utils/stringFunctions';

import { Modal } from 'react-responsive-modal';
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import styles from './BookingDeleteModal.module.css';
import {
  deleteRentalById,
  getBookingsById,
} from '../../redux/rentals_slice/rentalActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  reactResponsiveModalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  visitDetail: {
    color: 'yellow',
    backgroundColor: '#4D35B0',
    borderRadius: 4,
    textAlign: 'center',
    lineHeight: '20px',
    border: '2px solid white',
    width: '45%',
    marginBottom: '1.2rem',
    height: '2rem',
    transition: 'all .3s',
    '&:hover': {
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
  },
  modalImageDecor: {
    width: '30%',
    marginLeft: '35%',
    marginBottom: '-2rem',
    transition: 'all .5s',
    '&:hover': {
      transform: 'scale(1.4)',
      cursor: 'pointer',
    },
  },
  modalConfirmBtn: {
    display: 'flex',
    width: '40%',
    marginTop: '2rem',
    justifyContent: 'center',
    height: '3rem',
  },
}));

const RentalDeleteModal = ({
  rental,
  openRentalDeleteModal,
  setOpenRentalDeteleModal,
}) => {
  const classes = useStyles();
  const onCloseModal = () => setOpenRentalDeteleModal(false);
  const { bookings } = useSelector(state => state.bookingsByRentalID);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookingsById(rental._id));
  }, [dispatch, rental]);
  return (
    <Modal
      open={openRentalDeleteModal}
      onClose={onCloseModal}
      center
      className={styles.modal}
      style={{ background: 'rgba(0,0,0,0.1)' }}>
      <Grid container lg={12} md={12}>
        <Grid item lg={12} md={12}>
          <Typography variant='h2'>Want to remove your posting?</Typography>
          <Box margin={5}>
            <img
              src={rental.image}
              alt='modal home'
              className={classes.modalImageDecor}
            />
          </Box>
        </Grid>
        <Grid container md={12}>
          <Grid item md={12}>
            <Typography variant='h4'>
              Short Description: {rental.title}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant='h4'>
              Address: city - {firstUpperLetter(rental.city)}, street -{' '}
              {firstUpperLetter(rental.street)}
            </Typography>
          </Grid>
          <Grid item md={12}></Grid>
        </Grid>
        <Divider />
        {bookings && (
          <Grid item md={6}>
            <Button
              color='primary'
              variant='contained'
              disabled={bookings.length > 0}
              className={classes.modalConfirmBtn}
              onClick={() => dispatch(deleteRentalById(rental._id))}
              type='submit'>
              Delete Rental
            </Button>
            {bookings.length > 0 && (
              <blockquote
                style={{
                  padding: 5,
                  backgroundColor: '#714674',
                  color: '#EDE342',
                  fontSize: '1rem',
                  width: '100%',
                  boxShadow: '2px 2px 8px rgba(0,0,0,0.4)',
                }}>
                Your location have been booked by our customers. If you want to
                settle down all legal issues with booking-holders, please
                contact CUSTOMER SERVICE SUPPORT 8-888-118299
              </blockquote>
            )}
          </Grid>
        )}
      </Grid>
    </Modal>
  );
};

export default RentalDeleteModal;
