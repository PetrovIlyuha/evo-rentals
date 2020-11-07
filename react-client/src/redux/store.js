import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createRentalReducer,
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
  rentalByID: rentalDetailsReducer,
  createRental: createRentalReducer,
  userRegister: registerUserReducer,
  userLogin: loginUserReducer,
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
