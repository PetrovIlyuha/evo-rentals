import { Rental } from '../models/rentalModel.js';

export const getAllRentals = async (req, res) => {
  const data = await Rental.find({});
  res.json(data);
};

export const getRentalById = async (req, res) => {
  const placeID = req.params.id;
  const rental = await Rental.findById(placeID);
  if (rental) {
    return res.status(200).json(rental);
  } else {
    res.status(404);
    throw new Error('Rental not found');
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
  await Rental.findByIdAndRemove(id);
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
