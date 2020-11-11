import { Booking } from '../models/bookingModel.js';

export const createBooking = (req, res) => {
  const bookingData = req.body;
  const booking = new Booking(bookingData);
  Booking.find({ rental: booking.rental }, (error, rentalBookings) => {
    if (error) {
      res.status(404).json({ message: 'Booking not found' });
    }
    console.log(rentalBookings);
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
      return res.json({
        message: 'Booking cannot be created for the time period',
      });
    }
  });
};

const checkIfBookingIsValid = (booking, rentalBookings) => {
  return true;
};
