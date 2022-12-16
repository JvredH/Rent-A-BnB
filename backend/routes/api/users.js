const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator'); // check out this package, has a lot of methods that we can use so we dont have to write custom validators
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// series of middleware functions
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({checkFalsy: true})
    .withMessage('Must provide a first name'),
  check('lastName')
    .exists({checkFalsy: true})
    .withMessage('Must provide last name'),
  handleValidationErrors
];

// Sign up // user can create a new user instance in our database
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user); // create a jwt for user

    return res.json({ // send it back to our client
      user: user
    });
  }
);


module.exports = router;
