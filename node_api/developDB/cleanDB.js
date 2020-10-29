import dotenv from 'dotenv';
import mongoose from 'mongoose';
import DevelopDB from './DevelopDB.js';
import colors from 'colors';
dotenv.config();

const connectAndSeedTempData = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    console.log(
      `MongoDB Cluster connected: ${conn.connection.host}`.blue.underline,
    );
    const testDB = new DevelopDB();
    testDB.seedDataToDB();

    console.log(
      'Developer Database populated with Mock Data'.green.underline.bold,
    );
  } catch (err) {
    console.error(
      `Error connection MONGO cluster: ${err.message}`.red.underline.bold,
    );
    process.exit(1);
  }
};

connectAndSeedTempData();
