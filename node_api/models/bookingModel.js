import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
  startDate: { type: Date, required: 'Arrival Date is required' },
  endDate: { type: Date, required: 'Departure Date is required' },
  totalPrice: { type: Number, require: 'Total price is required' },
  nights: { type: Number, required: true },
  guests: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rental: { type: Schema.Types.ObjectId, ref: 'Rental', required: true },
  createdAt: { type: Date, default: Date.now },
  history: { type: Boolean, default: false },
});

export const Booking = mongoose.model('Booking', bookingSchema);
