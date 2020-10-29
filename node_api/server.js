import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import bodyParser from 'body-parser';
import connectDB from './config/connectMongo.js';
import rentalsRoutes from './routes/rentalsRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/', rentalsRoutes);
app.use('/api/v1/users/', userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Server spinning in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold,
  );
});
