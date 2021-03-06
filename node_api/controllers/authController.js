import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(422).send({
      errors: [
        {
          title: 'Missing login data',
          detail: 'Email or password is missing!',
        },
      ],
    });
  }
  User.findOne({ email }, (error, foundUser) => {
    if (error) {
      return res.status(422).send({
        errors: [
          {
            title: 'Error getting user from database',
            detail:
              'Something went wrong while querying database for the user. Try again in a minute!',
          },
        ],
      });
    }
    if (!foundUser) {
      return res.status(422).send({
        errors: [
          {
            title: 'User with provided email was not found',
            detail:
              'Check your credentials. It seems to contain some invalid info!',
          },
        ],
      });
    }
    if (foundUser.passwordsMatch(password)) {
      const token = jwt.sign(
        { userId: foundUser._id, username: foundUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1w' },
      );
      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [
          {
            title: 'You have provided wrong password',
            detail:
              'Check your credentials. It seems to contain some invalid info!',
          },
        ],
      });
    }
  });
};

const registerNewUser = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.status(401).send({ message: 'Email or password is missing' });
  }
  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        { title: 'Invalid password', detail: 'Passwords do not match!' },
      ],
    });
  }
  User.findOne({ email }, (error, existingUser) => {
    if (error) {
      return res.status(422).send({
        errors: [
          {
            title: 'User was not found',
            detail: 'User with the given simply does not exist in our DB!',
          },
        ],
      });
    }
    if (existingUser) {
      return res
        .status(422)
        .json({ message: 'Seem like you have been our user already!' });
    }
    const user = new User({ username, email, password });
    user.save((err, user) => {
      if (err) {
        return res.status(422).send({
          errors: [
            { title: 'Error on saving user', detail: 'User was not saved!' },
          ],
        });
      }
      res.json({ user });
    });
  });
};

export { loginUser, registerNewUser };
