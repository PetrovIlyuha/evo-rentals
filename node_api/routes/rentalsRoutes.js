import express from 'express';
import {
  createRental,
  getAllRentals,
  getOnlyMyRentals,
  getRentalById,
  removeRentalById,
  updateRentalById,
  getRentalOwner,
} from '../controllers/rentalsController.js';
import { authUserMiddleware } from '../middleware/authUserMiddleware.js';
const router = express.Router();

router.get('/rentals', getAllRentals);
router.post('/my-rentals', authUserMiddleware, getOnlyMyRentals);

router.get('/rentals/:id', getRentalById);
router.get('/rentals/:id/owner', getRentalOwner);

router.post('/rentals', authUserMiddleware, createRental);

router.delete('/rentals/:id', authUserMiddleware, removeRentalById);

router.patch('/rentals/:id', updateRentalById);

export default router;
