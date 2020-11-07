import express from 'express';
import {
  createRental,
  getAllRentals,
  getRentalById,
  removeRentalById,
  updateRentalById,
} from '../controllers/rentalsController.js';
import { authUserMiddleware } from '../middleware/authUserMiddleware.js';
const router = express.Router();

router.get('/rentals', getAllRentals);

router.get('/rentals/:id', getRentalById);

router.post('/rentals', authUserMiddleware, createRental);

router.delete('/rentals/:id', removeRentalById);

router.patch('/rentals/:id', updateRentalById);

export default router;
