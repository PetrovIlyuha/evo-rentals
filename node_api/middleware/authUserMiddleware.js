import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const authUserMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const { decodedToken, error } = parseToken(token);
    if (error) {
      return notAuthorized(res);
    }
    User.findById(decodedToken.userId, (error, authorizedUser) => {
      if (error) {
        return res.status(422).send({
          errors: [
            {
              title: 'Database access error',
              detail: 'Something went wrong! Try again',
            },
          ],
        });
      }
      if (authorizedUser) {
        res.locals.user = authorizedUser;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};

function parseToken(token) {
  try {
    const decodedToken = jwt.verify(
      token.split(' ')[1],
      process.env.JWT_SECRET,
    );
    return { decodedToken };
  } catch (err) {
    return { error: err.message };
  }
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      {
        title: 'You are not authorized!',
        detail: 'Log in to get access to that section',
      },
    ],
  });
}
