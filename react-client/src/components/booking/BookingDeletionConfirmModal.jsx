import React from 'react';
// import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { format } from 'date-fns';
import styles from './BookingDeleteModal.module.css';

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

const ConfirmationModal = ({
  booking,
  removeBooking,
  openModal,
  setOpenModal,
}) => {
  const classes = useStyles();
  const onCloseModal = () => setOpenModal(false);
  return (
    <Modal
      open={openModal}
      onClose={onCloseModal}
      center
      className={styles.modal}
      style={{ background: 'rgba(0,0,0,0.1)' }}>
      <Grid container lg={12} md={12}>
        <Grid item lg={12} md={12}>
          <Typography variant='h2'>Delete this booking position?</Typography>
          <Box margin={5}>
            <img
              src={booking.rental.image}
              alt='modal home'
              className={classes.modalImageDecor}
            />
          </Box>
        </Grid>
        <Grid container md={12}>
          <Grid item md={12}>
            <Typography variant='h5'>
              <strong>Date of arrival:</strong>{' '}
              {format(new Date(booking.startDate), 'dd MMMM yyyy')}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant='h5' md={12}>
              <strong>Date of leave:</strong>{' '}
              {format(new Date(booking.endDate), 'dd MMMM yyyy')}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant='h5' md={12}>
              <strong>Amount to refund:</strong> $ {booking.totalPrice}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid item md={6}>
          <Button
            color='primary'
            variant='contained'
            className={classes.modalConfirmBtn}
            onClick={() => removeBooking(booking._id)}
            type='submit'>
            Delete Booking
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ConfirmationModal;
