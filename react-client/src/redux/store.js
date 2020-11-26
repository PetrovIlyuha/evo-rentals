import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  authenticatedUserRentalsList,
  bookingsByRentalIDReducer,
  createBookingReducer,
  createRentalReducer,
  currentUserBookingsList,
  deleteRentalReducer,
  getRentalOwnerReducer,
  receivedBookingsReducer,
  removeBookingReducer,
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
  rentalOwner: getRentalOwnerReducer,
  createRental: createRentalReducer,
  userRegister: registerUserReducer,
  userLogin: loginUserReducer,
  booking: createBookingReducer,
  bookingsByRentalID: bookingsByRentalIDReducer,
  bookingsReceived: receivedBookingsReducer,
  deletedBooking: removeBookingReducer,
  deletedRental: deleteRentalReducer,
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
