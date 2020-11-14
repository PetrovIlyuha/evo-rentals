import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  authenticatedUserRentalsList,
  bookingsByRentalIDReducer,
  createBookingReducer,
  createRentalReducer,
  currentUserBookingsList,
  rentalDetailsReducer,
  rentalsListReducer,
} from './rentals_slice/rentalsReducer';
import {
  loginUserReducer,
  registerUserReducer,
} from './user_slice/authReducer';

// reducers

const reducer = combineReducers({
  rentals: rentalsListReducer,
  activeUserRentalsList: authenticatedUserRentalsList,
  authUserBookings: currentUserBookingsList,
  rentalByID: rentalDetailsReducer,
  createRental: createRentalReducer,
  userRegister: registerUserReducer,
  userLogin: loginUserReducer,
  booking: createBookingReducer,
  bookingsByRentalID: bookingsByRentalIDReducer,
});

const initialState = {
  rentals: [],
  rentalByID: {},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
