import { Rental } from '../models/rentalModel.js';
import { rentals } from './rentalsMockData.js';

class DevelopDB {
  async clean() {
    return await Rental.deleteMany({});
  }

  async populate() {
    return await Rental.create(rentals);
  }

  seedDataToDB() {
    this.clean();
    this.populate();
  }
}

export default DevelopDB;
