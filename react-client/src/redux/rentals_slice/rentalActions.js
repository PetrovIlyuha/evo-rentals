import axios from 'axios';
import {
  RENTALS_LIST_FAIL,
  RENTALS_LIST_REQUEST,
  RENTALS_LIST_SUCCESS,
  RENTAL_CREATE_FAILURE,
  RENTAL_CREATE_REQUEST,
  RENTAL_CREATE_RESET,
  RENTAL_CREATE_SUCCESS,
  RENTAL_DETAILS_FAIL,
  RENTAL_DETAILS_REQUEST,
  RENTAL_DETAILS_SUCCESS,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAILURE,
  MY_RENTALS_LIST_REQUEST,
  MY_RENTALS_LIST_SUCCESS,
  MY_RENTALS_LIST_FAIL,
  MY_BOOKINGS_LIST_REQUEST,
  MY_BOOKINGS_LIST_SUCCESS,
  MY_BOOKINGS_LIST_FAIL,
  BOOKING_BY_ID_REQUEST,
  BOOKING_BY_ID_SUCCESS,
  BOOKING_BY_ID_FAILURE,
  RENTAL_OWNER_REQUEST,
  RENTAL_OWNER_SUCCESS,
  RENTAL_OWNER_FAILURE,
  RECEIVED_BOOKINGS_REQUEST,
  RECEIVED_BOOKINGS_SUCCESS,
  RECEIVED_BOOKINGS_FAILURE,
  REMOVE_BOOKING_REQUEST,
  REMOVE_BOOKING_SUCCESS,
  REMOVE_BOOKING_FAILURE,
  RENTAL_DELETE_REQUEST,
  RENTAL_DELETE_SUCCESS,
  RENTAL_DELETE_FAILURE,
} from './types';

export const listAllRentals = (queryParam = '') => async dispatch => {
  try {
    dispatch({ type: RENTALS_LIST_REQUEST });
    const { data } = await axios.get(`/api/v1/rentals?city=${queryParam}`);
    dispatch({ type: RENTALS_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: RENTALS_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const showMyRentals = userId => async dispatch => {
  const token = localStorage.getItem('user-session-token');
  try {
    dispatch({ type: MY_RENTALS_LIST_REQUEST });
    const { data } = await axios.post(
      `/api/v1/my-rentals`,
      { userId: userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch({ type: MY_RENTALS_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: MY_RENTALS_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getRentalById = id => async dispatch => {
  try {
    dispatch({ type: RENTAL_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/rentals/${id}`);
    dispatch({ type: RENTAL_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: RENTAL_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getRentalOwner = id => async dispatch => {
  try {
    dispatch({ type: RENTAL_OWNER_REQUEST });
    const { data } = await axios.get(`/api/v1/rentals/${id}/owner`);
    dispatch({ type: RENTAL_OWNER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: RENTAL_OWNER_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createRental = rentalValues => async dispatch => {
  const token = localStorage.getItem('user-session-token');
  try {
    dispatch({ type: RENTAL_CREATE_REQUEST });
    await axios.post(`/api/v1/rentals`, rentalValues, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: RENTAL_CREATE_SUCCESS });
  } catch (err) {
    dispatch({
      type: RENTAL_CREATE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  } finally {
    dispatch({ type: RENTAL_CREATE_RESET });
  }
};

export const createBooking = bookingData => async dispatch => {
  const token = localStorage.getItem('user-session-token');
  try {
    dispatch({ type: BOOKING_CREATE_REQUEST });
    const { data } = await axios.post(`/api/v1/bookings/create`, bookingData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: BOOKING_CREATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BOOKING_CREATE_FAILURE,
      payload: 'Booking is not available for the chosen period',
    });
  }
};

export const showMyBookings = userId => async dispatch => {
  const token = localStorage.getItem('user-session-token');
  try {
    dispatch({ type: MY_BOOKINGS_LIST_REQUEST });
    const { data } = await axios.post(
      `/api/v1/bookings/my-bookings`,
      { userId: userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch({ type: MY_BOOKINGS_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: MY_BOOKINGS_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getBookingsById = rentalId => async dispatch => {
  try {
    dispatch({ type: BOOKING_BY_ID_REQUEST });
    const { data } = await axios.post(
      `/api/v1/bookings/booking-by-id`,
      { rentalId: rentalId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch({ type: BOOKING_BY_ID_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BOOKING_BY_ID_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getBookingsReceived = () => async dispatch => {
  const token = localStorage.getItem('user-session-token');
  try {
    dispatch({ type: RECEIVED_BOOKINGS_REQUEST });
    const { data } = await axios.get(`/api/v1/bookings/received-bookings`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: RECEIVED_BOOKINGS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: RECEIVED_BOOKINGS_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const removeBookingById = bookingId => async dispatch => {
  const token = localStorage.getItem('user-session-token');
  try {
    dispatch({ type: REMOVE_BOOKING_REQUEST });
    const { data } = await axios.delete(`/api/v1/bookings/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: REMOVE_BOOKING_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: REMOVE_BOOKING_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteBookingById = rentalId => async dispatch => {
  const token = localStorage.getItem('user-session-token');
  try {
    dispatch({ type: RENTAL_DELETE_REQUEST });
    const { data } = await axios.delete(`/api/v1/rentals/${rentalId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: RENTAL_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: RENTAL_DELETE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
