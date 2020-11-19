import {
  RENTALS_LIST_FAIL,
  RENTALS_LIST_REQUEST,
  RENTALS_LIST_SUCCESS,
  MY_RENTALS_LIST_REQUEST,
  MY_RENTALS_LIST_SUCCESS,
  MY_RENTALS_LIST_FAIL,
  RENTAL_DETAILS_REQUEST,
  RENTAL_DETAILS_SUCCESS,
  RENTAL_DETAILS_FAIL,
  RENTAL_DETAILS_RESET,
  RENTAL_CREATE_REQUEST,
  RENTAL_CREATE_SUCCESS,
  RENTAL_CREATE_FAILURE,
  RENTAL_CREATE_RESET,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAILURE,
  CREATE_BOOKING_RESET,
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
} from './types';

export const rentalsListReducer = (
  state = { rentals: [] },
  { type, payload },
) => {
  switch (type) {
    case RENTALS_LIST_REQUEST:
      return { ...state, loading: true, rentals: [] };
    case RENTALS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        rentals: payload,
      };
    case RENTALS_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const authenticatedUserRentalsList = (
  state = { rentals: [] },
  { type, payload },
) => {
  switch (type) {
    case MY_RENTALS_LIST_REQUEST:
      return { ...state, loading: true, rentals: [] };
    case MY_RENTALS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        rentals: payload,
      };
    case MY_RENTALS_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const rentalDetailsReducer = (
  state = { rentalByID: {} },
  { type, payload },
) => {
  switch (type) {
    case RENTAL_DETAILS_REQUEST:
      return { ...state, loading: true };
    case RENTAL_DETAILS_SUCCESS:
      return { ...state, loading: false, success: true, rentalByID: payload };
    case RENTAL_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };
    case RENTAL_DETAILS_RESET:
      return { ...state, rentalByID: {} };
    default:
      return state;
  }
};

export const createRentalReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case RENTAL_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RENTAL_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
      };
    case RENTAL_CREATE_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
        success: false,
      };
    case RENTAL_CREATE_RESET:
      return { ...state, success: null, error: null, loading: null };
    default:
      return state;
  }
};

export const createBookingReducer = (
  state = { error: 'clear' },
  { type, payload },
) => {
  switch (type) {
    case BOOKING_CREATE_REQUEST:
      return { ...state, loading: true };
    case BOOKING_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: 'clear',
        booking: payload,
      };
    case BOOKING_CREATE_FAILURE:
      return {
        ...state,
        booking: null,
        loading: false,
        success: false,
        error:
          'Time period overlaps with existing bookings. Check the bookings table below the location detail!',
      };
    case CREATE_BOOKING_RESET:
      return { ...state, loading: false, success: false, error: 'clear' };
    default:
      return state;
  }
};

export const currentUserBookingsList = (
  state = { bookings: [] },
  { type, payload },
) => {
  switch (type) {
    case MY_BOOKINGS_LIST_REQUEST:
      return { ...state, loading: true, bookings: [] };
    case MY_BOOKINGS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: payload,
      };
    case MY_BOOKINGS_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const bookingsByRentalIDReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case BOOKING_BY_ID_REQUEST:
      return { loading: true };
    case BOOKING_BY_ID_SUCCESS:
      return { ...state, loading: false, bookings: payload, success: true };
    case BOOKING_BY_ID_FAILURE:
      return { error: 'No bookings for this location yet!' };
    default:
      return state;
  }
};

export const getRentalOwnerReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case RENTAL_OWNER_REQUEST:
      return { ...state, loading: true };
    case RENTAL_OWNER_SUCCESS:
      return { ...state, loading: false, owner: payload };
    case RENTAL_OWNER_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const receivedBookingsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case RECEIVED_BOOKINGS_REQUEST:
      return { ...state, loading: true };
    case RECEIVED_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        bookingsIncoming: payload,
      };
    case RECEIVED_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};
