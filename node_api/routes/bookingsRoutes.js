import express from 'express';
const router = express.Router();
import { authUserMiddleware } from '../middleware/authUserMiddleware.js';

import {
  createBooking,
  getAllBookingsById,
  getMyBookings,
} from '../controllers/bookingsController.js';
import { isBookerOwnerMiddleware } from '../middleware/isBookerOwnerMiddleware.js';

router.post(
  '/create',
  authUserMiddleware,
  isBookerOwnerMiddleware,
  createBooking,
);

router.post('/my-bookings', authUserMiddleware, getMyBookings);
router.post('/booking-by-id', getAllBookingsById);

export default router;
