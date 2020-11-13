import { Rental } from '../models/rentalModel.js';

export const isBookerOwnerMiddleware = (req, res, next) => {
  const { rental } = req.body;
  const user = res.locals.user;
  Rental.findById(rental._id, (error, rentalFound) => {
    if (error) {
      res
        .status(422)
        .json({ error: 'Rental not found in isBookerOwner Middleware' });
    }
    if (rentalFound.owner.toString() === user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can't book your own listing" });
    } else {
      next();
    }
  });
};
