import express from 'express';
const router = express.Router();
import { authUserMiddleware } from '../middleware/authUserMiddleware.js';

import {
  createBooking,
  getAllBookingsById,
  getBookingsReceived,
  getMyBookings,
  deleteBooking,
} from '../controllers/bookingsController.js';
import { isBookerOwnerMiddleware } from '../middleware/isBookerOwnerMiddleware.js';

router.post(
  '/create',
  authUserMiddleware,
  isBookerOwnerMiddleware,
  createBooking,
);

router.get('/received-bookings', authUserMiddleware, getBookingsReceived);
router.post('/my-bookings', authUserMiddleware, getMyBookings);
router.post('/booking-by-id', getAllBookingsById);
router.delete('/:bookingId', authUserMiddleware, deleteBooking);
export default router;
