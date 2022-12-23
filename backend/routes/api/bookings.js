const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models')
const { check } = require('express-validator');
const { validationBookings } = require('../../utils/validation');

const { Op } = require('sequelize')

const router = express.Router();

const validateBookings = [
  check('startDate')
    .custom((value) => {
      const date = new Date(value);
      return!isNaN(date);
    })
    .withMessage('startDate must be a valid date'),
  check('endDate')
    .custom((value) => {
      const date = new Date((value));
      return !isNaN(date);
    })
    .withMessage('endDate must be a valid date'),
  validationBookings
]

// get all of the current user's bookings
router.get('/current', requireAuth, async ( req, res, next ) => {
  const user = req.user;

  const bookings = await Booking.findAll({
    where: {
      userId: user.id
    },
    include: [
      {
        model: Spot,
        include: [{model: SpotImage}]
      }
    ]
  })

  const bookingsJson = [];

  bookings.forEach(booking => {
    bookingsJson.push(booking.toJSON())
  })

  for (let i = 0; i < bookingsJson.length; i ++) {
    let obj = bookingsJson[i];
    let spot = obj.Spot;
    let spotImages = spot.SpotImages;
    for (let j = 0; j < spotImages.length; j++) {
      let image = spotImages[j];
      if (image.preview == true) {
        spot.previewImage = image.url
      }
    }
    if (!spot.previewImage) {
      spot.previewImage = 'No preview image available'
    }
    delete spot.SpotImages
  }

  return res.json({Bookings: bookingsJson})
})

// edit a booking
router.put('/:bookingId', requireAuth, validateBookings, async ( req, res, next ) => {
  const { bookingId } = req.params;
  const user = req.user;
  const { startDate, endDate } = req.body;

  const booking = await Booking.findByPk(bookingId);

  if(!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: res.statusCode
    })
  }

  if (user.id !== booking.userId) {
    res.status(401);
    return res.json({
      message: 'Only booking creator can edit a booking',
      statusCode: res.statusCode
    })
  }

  if (new Date(endDate) < new Date(startDate)) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: res.statusCode,
      errors: {
        endDate: 'endDate cannot come before startDate'
      }
    })
  }


  if (new Date(booking.endDate) < new Date()) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: res.statusCode
    })
  }

  const bookingConflictCheck = await Booking.findAll({
    where: {
      spotId: booking.spotId,
      [Op.or]: {
        startDate: {[Op.between]: [startDate, endDate]},
        endDate: {[Op.between]: [startDate, endDate]}
      }
    }
  })

  if (bookingConflictCheck.length) {
    res.status(403);
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: res.statusCode,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
    })
  }

  booking.update({
    startDate,
    endDate
  })

  res.json(booking)
})

// delete a booking
router.delete('/:bookingId', requireAuth, async ( req, res, next ) => {
  const { bookingId } = req.params;
  const user = req.user;

  const bookingToDelete = await Booking.findByPk(bookingId);

  if (!bookingToDelete) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: res.statusCode
    })
  }

  const spot = await Spot.findByPk(bookingToDelete.spotId);

  if (new Date(bookingToDelete.startDate) < new Date()) {
    res.status(403);
    return res.json({
      message: "Bookings that have been started can't be deleted",
      statusCode: res.statusCode
    })
  }

  if (user.id == spot.ownerId || user.id == bookingToDelete.userId) {
    bookingToDelete.destroy();
    res.status(200)
    return res.json({
      message: 'Successfully deleted',
      statusCode: res.statusCode
    })
  } else {
    res.status(401);
    return res.json({
      message: 'Booking must belong to user or spot owner to delete',
      statusCode: res.statusCode
    })
  }
})

module.exports = router;
