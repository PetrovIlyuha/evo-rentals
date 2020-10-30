import { User } from '../models/userModel.js';

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
      res.json({ token: 'token super token JWT is super', user: foundUser });
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
    return res.status(422).send({
      errors: [
        { title: 'Missing Data!', detail: 'Email or password is missing!' },
      ],
    });
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
      return res.status(422).send({
        errors: [
          {
            title: 'Email is taken',
            detail: 'User with provided email already exists!',
          },
        ],
      });
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
