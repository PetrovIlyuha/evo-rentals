import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const rentalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: [128, 'Title is too long. Max is 128 characters'],
  },
  city: {
    type: String,
    required: true,
    lowercase: true,
    maxlength: [80, 'City name exceeds 80 characters!'],
  },
  street: {
    type: String,
    required: true,
    lowercase: true,
    minlength: [4, 'Street name is too short! Minimum is 4 letters'],
  },
  category: { type: String, required: true },
  numOfRooms: { type: Number, required: true },
  numOfGuests: { type: Number, required: true },
  numOfBeds: { type: Number, required: true },
  shared: { type: Boolean, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  image: { type: String, required: true },
  image2: { type: String, required: true },
  dailyPrice: { type: Number, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  views: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

rentalSchema.statics.showError = function (res, config) {
  return res.status(config.status).json({ message: config.details });
};

export const Rental = mongoose.model('Rental', rentalSchema);
