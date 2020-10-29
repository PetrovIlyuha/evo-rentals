import express from 'express';
import {
  createRental,
  getAllRentals,
  getRentalById,
  removeRentalById,
  updateRentalById,
} from '../controllers/rentalsController.js';
const router = express.Router();

router.get('/rentals', getAllRentals);

router.get('/rentals/:id', getRentalById);

router.post('/rentals', createRental);

router.delete('/rentals/:id', removeRentalById);

router.patch('/rentals/:id', updateRentalById);

export default router;
