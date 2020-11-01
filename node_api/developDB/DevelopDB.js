import { Rental } from '../models/rentalModel.js';
import { User } from '../models/userModel.js';
import { rentals } from './rentalsMockData.js';
import { users } from './usersMockData.js';

class DevelopDB {
  async clean() {
    await Rental.deleteMany({});
    await User.deleteMany({});
  }

  async populate() {
    await Rental.create(rentals);
    await User.create(users);
  }

  async seedDataToDB() {
    await this.clean();
    await this.populate();
  }
}

export default DevelopDB;
