import axios from 'axios';
import {
  RENTALS_LIST_FAIL,
  RENTALS_LIST_REQUEST,
  RENTALS_LIST_SUCCESS,
  RENTAL_DETAILS_FAIL,
  RENTAL_DETAILS_REQUEST,
  RENTAL_DETAILS_SUCCESS,
} from './types';

export const listAllRentals = () => async dispatch => {
  try {
    dispatch({ type: RENTALS_LIST_REQUEST });
    const { data } = await axios.get(`/api/v1/rentals`);
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
