import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';

import { firstUpperLetter } from '../../utils/stringFunctions';
import { useBookingFilters } from '../../hooks/useBookingFilters';
import BookingDeletionConfirmModal from './BookingDeletionConfirmModal';

import { REMOVE_BOOKING_RESET } from '../../redux/rentals_slice/types';
import { removeBookingById } from '../../redux/rentals_slice/rentalActions';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.darkBlue,
    color: theme.palette.common.darkYellow,
    fontSize: 20,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
  body: {
    fontSize: 15,
    fontWeight: 700,
    color: 'white',
    borderRight: '2px solid white',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.common.lightBlue,
      color: 'white',
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.common.darkBlue,
      color: theme.palette.common.darkYellow,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700,
    [theme.breakpoints.down('sm')]: {
      minWidth: 400,
    },
  },
  image: {
    width: '150%',
    transition: '.3s all ease',
    paddingRight: 20,
    '&:hover': {
      transform: 'scale(3.5)',
    },
  },
}));

function ActiveBookingsList({ bookings, history, placedByMe = false }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showBooking, setShowBooking] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { success: bookingDeletionSuccess, error } = useSelector(
    state => state.deletedBooking,
  );

  useEffect(() => {
    if (bookingDeletionSuccess) {
      toast.success('Success! Booking canceled');
      setTimeout(() => {
        dispatch({ type: REMOVE_BOOKING_RESET });
      }, 1400);
    }
  }, [dispatch, bookingDeletionSuccess]);

  useEffect(() => {
    setOpenModal(false);
    if (error) {
      toast.error(error);
    }
    return () => {
      setTimeout(() => {
        dispatch({ type: REMOVE_BOOKING_RESET });
      }, 1000);
    };
  }, [error, dispatch]);

  const {
    filters,
    setArrivalDateFilters,
    setDepartureDateFilters,
    setPriceFilters,
    activeFilters,
  } = useBookingFilters(placedByMe);

  const removeBooking = id => {
    dispatch(removeBookingById(id));
    setOpenModal(false);
  };

  const moveBookingToHistory = id => {
    alert(`Booking with ${id} will be in history from now`);
    setOpenModal(false);
  };

  const openModalForBooking = id => {
    let currentBooking = bookings.filter(b => b._id === id);
    setOpenModal(true);
    setSelectedBooking(currentBooking[0]);
  };

  return (
    <>
      <Button
        variant='contained'
        color='secondary'
        style={{ marginBottom: 20, width: 100 }}
        onClick={() => setShowBooking(state => !state)}>
        {showBooking ? 'Hide' : 'Show'}
      </Button>
      {showBooking && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Rented Estate</StyledTableCell>
                <StyledTableCell>Estate Photo</StyledTableCell>
                <StyledTableCell align='right' onClick={setArrivalDateFilters}>
                  Arrival Date
                  <span style={{ cursor: 'pointer', marginLeft: 10 }}>
                    {' '}
                    {filters.some(f => f.name === 'dateStartFilterDesc')
                      ? '⬇'
                      : '⬆'}{' '}
                  </span>
                </StyledTableCell>
                <StyledTableCell
                  align='right'
                  onClick={setDepartureDateFilters}>
                  Departure Date
                  <span style={{ cursor: 'pointer', marginLeft: 10 }}>
                    {' '}
                    {filters.some(f => f.name === 'dateEndFilterAsc')
                      ? '⬆'
                      : '⬇'}{' '}
                  </span>
                </StyledTableCell>
                <StyledTableCell align='right' onClick={setPriceFilters}>
                  Price{' '}
                  <span style={{ cursor: 'pointer', marginLeft: 10 }}>
                    {filters.some(f => f.name === 'priceFilterDesc')
                      ? '⬇'
                      : '⬆'}
                  </span>
                </StyledTableCell>
                <StyledTableCell align='right' onClick={setPriceFilters}>
                  Cancel
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeFilters(bookings).map((booking, index) => (
                <StyledTableRow key={index} style={{ cursor: 'pointer' }}>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    onClick={() =>
                      history.push(`/rental/${booking.rental._id}`)
                    }>
                    {firstUpperLetter(booking.rental.city)}{' '}
                    {firstUpperLetter(booking.rental.street)}
                  </StyledTableCell>
                  <StyledTableCell
                    component='th'
                    onClick={() =>
                      history.push(`/rental/${booking.rental._id}`)
                    }
                    scope='row'
                    style={{ width: 80 }}>
                    <img
                      className={classes.image}
                      src={booking.rental.image}
                      alt='booking photograph'
                    />
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row' align='right'>
                    {format(new Date(booking.startDate), 'dd MMMM yyyy')}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {format(new Date(booking.endDate), 'dd MMMM yyyy')}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    $ {booking.totalPrice}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {!placedByMe ? (
                      moment().diff(moment(booking.endDate), 'days') > 1 ? (
                        <Button
                          variant='contained'
                          color='secondary'
                          onClick={() => openModalForBooking(booking._id)}>
                          Move to history
                        </Button>
                      ) : (
                        <Typography variant='h3' style={{ color: 'white' }}>
                          Active
                        </Typography>
                      )
                    ) : (
                      <Button
                        variant='contained'
                        color='secondary'
                        disabled={
                          moment(booking.startDate).diff(moment(), 'days') <
                            2 ||
                          moment().diff(moment(booking.startDate), 'days') > 0
                        }
                        onClick={() => openModalForBooking(booking._id)}>
                        {moment(booking.startDate).diff(moment(), 'days') < 2 ||
                        moment().diff(moment(booking.startDate), 'days') > 0
                          ? "Can't be removed"
                          : 'Cancel & Refund'}
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <ToastContainer />
        </TableContainer>
      )}
      {selectedBooking && (
        <BookingDeletionConfirmModal
          booking={selectedBooking}
          openModal={openModal}
          placedByMe={placedByMe}
          setOpenModal={setOpenModal}
          moveBookingToHistory={moveBookingToHistory}
          removeBooking={removeBooking}
        />
      )}
    </>
  );
}

export default withRouter(ActiveBookingsList);
