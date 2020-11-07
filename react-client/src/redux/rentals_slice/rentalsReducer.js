import {
  RENTALS_LIST_FAIL,
  RENTALS_LIST_REQUEST,
  RENTALS_LIST_SUCCESS,
  RENTAL_DETAILS_REQUEST,
  RENTAL_DETAILS_SUCCESS,
  RENTAL_DETAILS_FAIL,
  RENTAL_DETAILS_RESET,
  RENTAL_CREATE_REQUEST,
  RENTAL_CREATE_SUCCESS,
  RENTAL_CREATE_FAILURE,
  RENTAL_CREATE_RESET,
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
