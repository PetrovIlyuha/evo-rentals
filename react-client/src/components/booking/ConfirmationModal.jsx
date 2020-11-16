import React, { useState, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
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
import { useDispatch, useSelector } from 'react-redux';

import ModalHomeImage from '../../assets/modal_home_confirm.png';
import { createBooking } from '../../redux/rentals_slice/rentalActions';

const useStyles = makeStyles(theme => ({
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
  formValues,
  errors,
  setError,
  rental,
  setSubmitError,
  setSubmit,
  days,
  price,
}) => {
  const classes = useStyles();
  const { userId } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { startDate, endDate, guests } = formValues;

  let arrivalDay = format(new Date(startDate), 'dd MMMM yyyy');
  let departureDay = format(new Date(endDate), 'dd MMMM yyyy');
  const totalPrice = days * price;

  const [booking, setBooking] = useState({
    startDate: startDate,
    endDate: endDate,
    totalPrice,
    nights: days,
    guests,
    rental,
    user: userId,
  });

  useEffect(() => {
    setBooking({
      ...booking,
      startDate,
      endDate,
      nights: days,
      guests,
      totalPrice,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, days, guests, totalPrice]);

  const onOpenModal = e => {
    e.preventDefault();
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);

  const createBookingSubmitHandler = () => {
    dispatch(createBooking(booking));
    onCloseModal();
  };
  return (
    <Box margin={4}>
      <Button
        onClick={onOpenModal}
        fullWidth
        color='secondary'
        variant='contained'
        disabled={
          Object.keys(errors).length > 0 ||
          formValues.startDate < new Date().setDate(new Date().getDate() - 1)
        }
        elevation={10}>
        Reserve place
      </Button>
      <Modal open={open} onClose={onCloseModal} center>
        <Grid container lg={12} md={12}>
          <Grid item lg={12} md={12}>
            <Typography variant='h2'>Ready to reserve the place?</Typography>
            <Box margin={5}>
              <img
                src={ModalHomeImage}
                alt='modal home'
                className={classes.modalImageDecor}
              />
            </Box>
          </Grid>
          <Grid container md={12}>
            <Grid item md={6} className={classes.visitDetail}>
              <Typography variant='h5'>
                Date of arrival: {arrivalDay}
              </Typography>
            </Grid>
            <Grid item md={6} className={classes.visitDetail}>
              <Typography variant='h5'>
                Date of leave: {departureDay}
              </Typography>
            </Grid>
            <Grid item md={6} className={classes.visitDetail}>
              <Typography variant='h5'>
                Number of Guests:{' '}
                {guests > 1 ? `${guests} People` : `${guests} Person`}
              </Typography>
            </Grid>
            <Grid item md={6} className={classes.visitDetail}>
              <Typography variant='h5'>
                Price for the period: $ {days * price}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid item md={6}>
            <Button
              color='primary'
              variant='contained'
              className={classes.modalConfirmBtn}
              onClick={e => {
                e.preventDefault();
                try {
                  setSubmit(true);
                  createBookingSubmitHandler();
                  setSubmit(false);
                } catch (error) {
                  setSubmitError({
                    error: 'Could not create new rental! Try later...',
                  });
                  console.error(error);
                }
              }}
              type='submit'>
              Confirm Order
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
};

export default ConfirmationModal;
