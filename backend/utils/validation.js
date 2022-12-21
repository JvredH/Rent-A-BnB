const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

const validationSpots = (req, res, next) => {
  const validationErrors = validationResult(req);
  // console.log(validationErrors)

  if (!validationErrors.isEmpty()) { // refactor to make it look more like what it should
    const errors = validationErrors
    .array()
    .map((error) => `${error.msg}`);
    // console.log({errors})
      const err = Error('Validation Error');
      err.errors = errors;
      err.status = 400;

      // err.title = 'ValidationError';
      // res.json({
      //   message: err.message,
      //   statusCode: err.statusCode,
      //   errors: err.errors
      // })
      next(err)
  }
  next();
}


module.exports = {
  handleValidationErrors,
  validationSpots
};
