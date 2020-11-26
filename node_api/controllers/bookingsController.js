import { Booking } from '../models/bookingModel.js';
import { Rental } from '../models/rentalModel.js';
import moment from 'moment';

export const createBooking = (req, res) => {
  const bookingData = req.body;
  const booking = new Booking(bookingData);
  Booking.find({ rental: booking.rental }, (error, rentalBookings) => {
    if (error) {
      res.status(404).json({ message: 'Booking not found' });
    }
    const validBooking = checkIfBookingIsValid(booking, rentalBookings);
    if (validBooking) {
      booking.save((error, bookingSaved) => {
        if (error) {
          return res.status(422).json({
            message: 'Saving booking operation has failed... Try again',
          });
        }
        return res.json({
          startDate: bookingSaved.startDate,
          endDate: bookingSaved.endDate,
        });
      });
    } else {
      res.status(422).json({
        error: 'Booking cannot be created for the time period',
      });
    }
  });
};

const checkIfBookingIsValid = (potentailBooking, allRentalBookings) => {
  let isBookingValid = true;
  if (allRentalBookings.length > 0) {
    isBookingValid = allRentalBookings.every(booking => {
      const potentialStart = moment(potentailBooking.startDate);
      const potentialEnd = moment(potentailBooking.endDate);
      const existingStart = moment(booking.startDate);
      const existingEnd = moment(booking.endDate);
      return potentialStart > existingEnd || potentialEnd < existingStart;
    });
  }
  return isBookingValid;
};

export const getMyBookings = async (req, res) => {
  const { userId } = req.body;
  try {
    const data = await Booking.find({ user: userId })
      .populate('rental')
      .populate('user', '-password');
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ error: 'No bookings for this user exists!' });
  }
};

export const getAllBookingsById = async (req, res) => {
  const { rentalId } = req.body;
  try {
    const data = await Booking.find({ rental: rentalId }).populate('rental');
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: 'No bookings for this place yet!' });
  }
};

export const getBookingsReceived = async (req, res) => {
  const { user } = res.locals;
  try {
    const rentals = await Rental.find({ owner: user }, '_id');
    const rentalIds = rentals.map(i => i.id);
    const bookings = await Booking.find({ rental: { $in: rentalIds } })
      .populate('user')
      .populate('rental');
    return res.json(bookings);
  } catch (err) {
    return res.status(401).json({ message: 'Rentals was not found. Strange' });
  }
};

export const deleteBooking = async (req, res) => {
  console.log('start delete booking');
  const { bookingId } = req.params;
  const { user } = res.locals;
  try {
    const booking = await Booking.findById(bookingId).populate('user');
    if (user.id !== booking.user.id) {
      return res.status(403).json({
        error: 'You have not created this booking to be able to delete it!',
      });
    }
    if (moment(booking.startDate).diff(moment(), 'days') > 2) {
      await booking.remove();
      return res.json({ id: bookingId });
    } else {
      return res.status(403).json({
        message:
          "You can't revert the payment when current date is sooner than 2 days before arrival date!",
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Could not delete your bookings. Try again later!' });
  }
};
