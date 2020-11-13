import express from 'express';
const router = express.Router();
import { authUserMiddleware } from '../middleware/authUserMiddleware.js';

import {
  createBooking,
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

export default router;
