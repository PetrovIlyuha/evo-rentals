export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export const mongooseErrorHandler = (req, res, next) => {
  res.mongoError = dbError => {
    const normalizedErrors = [];
    const errorField = 'errors';

    if (
      dbError &&
      dbError.hasOwnProperty(errorField) &&
      dbError.name === 'ValidationError'
    ) {
      const errors = dbError[errorField];
      for (const prop in errors) {
        if (errors.hasOwnProperty(prop)) {
          normalizedErrors.push({ title: prop, detail: errors[prop].message });
        }
      }
    } else {
      normalizedErrors.push({
        title: 'Database connection error',
        detail: 'Something went wrong. Working on it!',
      });
    }
    return res.status(422).send({ errors: normalizedErrors });
  };
  next();
};
