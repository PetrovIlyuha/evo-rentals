import { Rental } from '../models/rentalModel.js';
import { Booking } from '../models/bookingModel.js';

export const getAllRentals = async (req, res) => {
  const { city } = req.query;
  const searchQuery = city ? { city } : {};
  const data = await Rental.find(searchQuery).populate('owner');
  res.json(data);
};

export const getOnlyMyRentals = async (req, res) => {
  const userId = req.body.userId;
  const data = await Rental.find({ owner: userId });
  if (data) {
    res.json(data);
  } else {
    res
      .status(404)
      .json({ error: 'You have got no rentals by now...Create one!' });
  }
};

export const getRentalById = async (req, res) => {
  const placeID = req.params.id;
  const rental = await Rental.findById(placeID).populate('owner');
  rental.views += 1;
  rental.save((err, savedRental) => {
    if (err) {
      return res
        .status(401)
        .json({ error: 'Failed to update rental data after view' });
    }
    res.status(200).json(savedRental);
  });
};

export const getRentalOwner = async (req, res) => {
  const placeId = req.params.id;
  const rentalWithOwner = await Rental.findById(placeId)
    .populate('owner')
    .select('-_id')
    .select('-category')
    .select('-numOfRooms')
    .select('-numOfGuests')
    .select('-numOfBeds')
    .select('-phone')
    .select('-image')
    .select('-image2')
    .select('-dailyPrice')
    .select('-description')
    .select('-createdAt')
    .select('-updatedAt')
    .select('-__v')
    .select('-shared')
    .select('-views')
    .select('-title')
    .select('-city')
    .select('-street');
  if (rentalWithOwner) {
    res.status(200).json(rentalWithOwner);
  } else {
    res
      .status(404)
      .json({ error: 'Owner of the location was not found. That is weird!' });
  }
};

export const createRental = async (req, res) => {
  const rentalData = req.body;
  rentalData.owner = res.locals.user;
  const newRental = await new Rental(rentalData);
  newRental.save((err, data) => {
    if (err) {
      return Rental.showError(res, {
        status: 422,
        details: 'Cannot create a rental instance in the DB',
      });
    }
    return res.json({
      message: `Rental with ID: ${data._id} was created in the Database`,
    });
  });
};

export const removeRentalById = async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;
  try {
    const rental = await Rental.findById(id).populate('owner');
    const bookings = await Booking.find({ rental });
    if (user.id !== rental.owner.id) {
      res.status(403).json({
        message:
          'You are not an owner for this rental! Operation has been terminated!',
      });
    }
    if (bookings && bookings.length > 0) {
      const permittedDeletion = bookings.every(
        booking => moment(booking.endDate).diff(moment(), 'days') > 0,
      );
      if (permittedDeletion) {
        await rental.remove();
        return res.json({ id });
      } else {
        return res.status(400).json({
          message: 'Location have active bookings. Operation canceled.',
        });
      }
    }
    await rental.remove();
    return res.json({ id });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Rental can't be removed! Try again later..." });
  }
};

export const updateRentalById = async (req, res) => {
  const { id } = req.params;
  const { city, title } = req.body;
  const rentalIndex = apartments.findIndex(rental => rental.id === id);
  if (rentalIndex > -1) {
    apartments[rentalIndex].title = title;
    apartments[rentalIndex].city = city;
  }
  return res.json({ message: `Rental with ID ${id} was updated` });
};
