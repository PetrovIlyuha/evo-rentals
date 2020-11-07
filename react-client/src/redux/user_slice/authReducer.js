import jwt from 'jsonwebtoken';

import {
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
} from './types';

export const registerUserReducer = (
  state = { user: {} },
  { type, payload },
) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, user: payload, loading: false };
    case USER_REGISTER_FAILED:
      return { ...state, loading: false, error: payload };
    case USER_REGISTER_RESET:
      return { ...state, user: {} };
    default:
      return state;
  }
};

let loginInitialState;
if (localStorage.getItem('user-session-token')) {
  jwt.verify(
    localStorage.getItem('user-session-token'),
    'B3Qfnrh5jWQEJGuzJBXmGu62eH5MFHeLNppmqWs4stR',
    function (err, decoded) {
      if (err) {
        throw new Error('Problem with decoding token');
      }
      loginInitialState = {
        userId: decoded.userId,
        username: decoded.username,
      };
    },
  );
} else {
  loginInitialState = {
    userId: null,
    username: null,
  };
}

export const loginUserReducer = (
  state = loginInitialState,
  { type, payload },
) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userId: payload.userId,
        username: payload.username,
        token: payload.token,
        loading: false,
        error: null,
      };
    case USER_LOGIN_FAILED:
      return { ...state, loading: false, error: payload };
    case USER_LOGOUT:
      localStorage.removeItem('user-session-token');
      return {
        ...state,
        userId: null,
        username: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
