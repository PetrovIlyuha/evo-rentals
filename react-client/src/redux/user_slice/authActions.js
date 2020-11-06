import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from './types';

export const registerUser = userData => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await axios.post(`/api/v1/users/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const loginUser = loginData => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post(`/api/v1/users/login`, loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('user-session-token', data);
    let userId, username;
    jwt.verify(data, process.env.REACT_APP_JWT_SECRET, function (err, decoded) {
      if (err) {
        throw new Error('Problem with decoding token');
      }
      userId = decoded.userId;
      username = decoded.username;
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: { userId, username } });
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
