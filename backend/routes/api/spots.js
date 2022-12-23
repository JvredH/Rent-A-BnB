const express = require('express');


const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Review, User, SpotImage, sequelize, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors, validationSpots, validationReviews, validateQuery } = require('../../utils/validation');

const { Op } = require('sequelize')

const router = express.Router();

// const { address, city, state, country, lat, lng, name, description, price } = req.body

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({max: 50})
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  validationSpots
];

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5'),
  validationReviews
];

const validateQueryParams = [
  check('page')
    .optional()
    .isInt({min: 1})
    .withMessage('Page must be greater than or equal to 1'),
  check('size')
    .optional()
    .isInt({min:1})
    .withMessage('Page must be greater than or equal to 1'),
  check('maxLat')
    .optional()
    .isDecimal()
    .withMessage('Maximum latitude is invalid'),
  check('minLat')
    .optional()
    .isDecimal()
    .withMessage('Minimum latitude is invalid'),
  check('minLng')
    .optional()
    .isDecimal()
    .withMessage('Minimum longitude is invalid'),
  check('maxLng')
    .optional()
    .isDecimal()
    .withMessage('Maximum longitude is invalid'),
  check('minPrice')
    .optional()
    .isFloat({min: 0})
    .withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice')
    .optional()
    .isFloat({min: 0})
    .withMessage('Maximum price must be greater than or equal to 0'),
  validateQuery
]

// get all reviews by spot id
router.get('/:spotId/reviews', async ( req, res, next ) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode
    })
  }

  const reviews = await Review.findAll({
    where: {
      spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  const reviewsJson = [];

  reviews.forEach(review => {
    reviewsJson.push(review.toJSON())
  })

  return res.json({Reviews: reviewsJson})
})

// get all bookings for a spot based on spot id
router.get('/:spotId/bookings', requireAuth, async ( req, res, next ) => {
  const user = req.user;
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode
    })
  }

  if (user.id !== spot.ownerId) {
    const booking = await Booking.findAll({
      where: {
        spotId
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })

    return res.json({Bookings: booking})
  }

  if (user.id == spot.ownerId) {
    const booking = await Booking.findAll({
      where: {
        spotId
      },
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    })
    return res.json({Bookings: booking})
  }

})

// create a booking from a spot based on the spots id
router.post('/:spotId/bookings', requireAuth, async ( req, res, next ) => {
  const { spotId } = req.params;
  const user = req.user;
  const { startDate, endDate } = req.body

  const spot = await Spot.findByPk(spotId);

  // invalid spot
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode
    })
  }

  // validation error
  if (endDate <= startDate) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: res.statusCode,
      errors: {endDate: "endDate cannot be on or before startDate"}
    })
  }

  // can't book a date that already passed
  if (startDate < new Date()){
    res.status(400);
    return res.json({
      message: 'Validation Error',
      statusCode: res.statusCode,
      errors: {startDate: "startDate cannot be before today's date"}
    })
  }

  // checking to make sure owner is not booking own spot
  if (user.id == spot.ownerId) {
    res.status(400);
    return res.json({
      message: 'Owner cannot book their own spot',
      statusCode: res.statusCode
    })
  }

  // booking conflict
  const bookingConflictCheck = await Booking.findAll({
    where: {
      spotId: spotId,
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

  const newBooking = await Booking.create({
    spotId: Number(spotId),
    userId: user.id,
    startDate,
    endDate
  })

  res.json(newBooking)
})

// create a review for a spot based on the spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async ( req, res, next ) => {
  const { spotId } = req.params;
  const user = req.user;
  const { review, stars } = req.body

  const spot = await Spot.findByPk(spotId);
  const userReviews = await Review.findAll({
    where: {
      [Op.and]: {
        userId: user.id,
        spotId: spotId
      }
    }
  })


  if(!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode
    })
  }

  if (userReviews.length) {
    res.status(403);
    return res.json({
      message: 'User already has a review for this spot',
      statusCode: res.statusCode
    })
  }

  if(user.id == spot.ownerId) {
    res.status(403);
    return res.json({
      message: 'Owner cannot write a review for their own spot',
      statusCode: res.statusCode
    })
  }

  const newReview = await Review.create({
    userId: user.id,
    spotId,
    review,
    stars
  })


  res.status(201)
  return res.json(newReview)
})


router.post('/:spotId/images', requireAuth, async ( req, res, next ) => {
  const { url, preview } = req.body;
  const { spotId } = req.params
  const user = req.user;

  // check if user is owner of spot
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode
    })
  } else {
      if (spot.ownerId == user.id) {
        const newImage = await SpotImage.create({
          spotId: spotId,
          url,
          preview
        })
        return res.json({
          id: newImage.id,
          url,
          preview
        })
      } else {
        res.status(400)
        return res.json({
          message: 'Spot must belong to user to add image',
          statusCode: res.statusCode
        })
      }
  }
})

router.get('/current', requireAuth, async (req, res, next) => {
  const { id } = req.user
  // console.log(id)
  const currentUserSpots = await Spot.findAll({
    where: {
      ownerId: id
    },
    include: [
      {
        model: Review,
        attributes: ['stars']
      },
      {
        model: SpotImage,
        attributes: ['url', 'preview']
      }
    ]
  })

  if (!currentUserSpots.length) {
    return res.json({message: 'User has no spots'})
  }

  const spots = [];

  currentUserSpots.forEach(spot => {
    spots.push(spot.toJSON())
  })

  spots.forEach(spot => {
    let reviewsArr = spot.Reviews;
    let arrLength = reviewsArr.length;
    let sum = 0;
    reviewsArr.forEach(star => {
      sum += star.stars
      spot.avgRating = sum / arrLength
    })
    delete spot.Reviews
  })

  spots.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if (image.preview == true) {
        spot.previewImage = image.url
      }
    })
    if (!spot.previewImage) {
      spot.previewImage = 'No preview image available'
    }
    delete spot.SpotImages
  })
  // console.log(spots)
  res.json({Spots: spots})
})


router.get('/:spotId', async ( req, res, next ) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: Review,
        attributes: ['stars']
      },
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
      },
      {
        model: User,
        attributes: ['id', 'firstName','lastName']
      }
    ]
  });


  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode
    })
  }

  const spotJson = spot.toJSON();

  const numReviews = spotJson.Reviews.length;
  spotJson.numReviews = numReviews;
  // console.log(numReviews)

  let reviews = spotJson.Reviews;
  let total = 0;

  reviews.forEach(star => {
    total += star.stars
    spotJson.avgStarRating = total / numReviews;
  })

  let SpotImages = spotJson.SpotImages;

  delete spotJson.SpotImages;

  spotJson.SpotImages = SpotImages;

  let Owner = {}

  const spotJsonOwner = spotJson.User;

  Owner.id = spotJsonOwner.id;
  Owner.firstName = spotJsonOwner.firstName;
  Owner.lastName = spotJsonOwner.lastName;

  spotJson.Owner = Owner;

  delete spotJson.User;
  delete spotJson.Reviews;

  res.json(spotJson)
})

router.put('/:spotId', requireAuth, validateSpot, async ( req, res, next ) => {
  const { spotId } = req.params;
  const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body
  const user = req.user

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode
    })
  }

  if (user.id !== spot.ownerId) {
    res.status(404);
    return res.json({
      message: 'Only owner can edit this spot',
      statusCode: res.statusCode
    })
  }

  if (address) spot.set( {address} );
  if (city) spot.set( {city} );
  if (state) spot.set( {state} );
  if (country) spot.set( {country} );
  if (lat) spot.set( {lat} );
  if (lng) spot.set( {lng} );
  if (name) spot.set( {name} );
  if (description) spot.set( {description} );
  if (price) spot.set( {price} )

  await spot.save()

  return res.json(spot)
})

router.delete('/:spotId', requireAuth, async ( req, res, next ) => {
  const { spotId } = req.params;
  const user = req.user;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode
    })
  }

  if (user.id !== spot.ownerId) {
    res.status(404);
    return res.json({
      message: "Only owners can delete this spot",
      statusCode: res.statusCode
    })
  }

  if (spot) {
    await spot.destroy()
    res.status(200)
    return res.json( {message: 'Successfully deleted', statusCode: res.statusCode} )
  }
})

router.post('/', requireAuth, validateSpot, async( req, res ) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const  user  = req.user

  const newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })
  res.status(201)
  return res.json(newSpot)

})


router.get('/', validateQueryParams, async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  const where = {};
  const pagination = {};

  page = +page;
  size = +size;

  if (isNaN(page) || page < 1 || page > 10) page = 1;
  if (isNaN(size) || size < 1 || size > 20) size = 20;

  let limit = size;
  let offset = size * (page - 1);

  pagination.limit = limit;
  pagination.offset = offset;


  if (minLat) {
    where.lat = {[Op.gte]: +minLat}
  }

  if (maxLat) {
    where.lat = {[Op.lte]: +maxLat}
  }

  if (maxLat && minLat) {
    where.lat = {[Op.between]: [+minLat, +maxLat]}
  }

  if (minLng) {
    where.lng = {[Op.gte]: +minLng}
  }

  if (maxLng) {
    where.lng = {[Op.lte]: +maxLng}
  }

  if (minLng && maxLng) {
    where.lng = {[Op.between]: [+minLng, +maxLng]}
  }

  if (minPrice) {
    where.price = {[Op.gte]: +minPrice}
  }

  if(maxPrice) {
    where.price = {[Op.lte]: +maxPrice}
  }

  if(minPrice && maxPrice) {
    where.price = {[Op.between]: [+minPrice, +maxPrice]}
  }



  const allSpots = await Spot.findAll({
    where,
    include: [
      {
        model: Review,
        attributes: ['stars'],
      },
      {
        model: SpotImage,
        attributes: ['url', 'preview']
      }
    ],
      ...pagination
  })

  // console.log(ratings)

  let allSpotsArray = []

  allSpots.forEach(spot => {
    allSpotsArray.push(spot.toJSON())
  })

  allSpotsArray.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if (image.preview == true) {
        spot.previewImage = image.url
      }
    })
    if (!spot.previewImage) {
      spot.previewImage = 'No preview image available'
    }
    delete spot.SpotImages
  })

  allSpotsArray.forEach(spot => { // iterate through each spot object
    let reviewsArr = spot.Reviews;
    let arrLength = reviewsArr.length;
    let sum = 0;
    reviewsArr.forEach(star => {
      sum += star.stars
      spot.avgRating = sum / arrLength
    })
    delete spot.Reviews
  })

  res.json({Spots: allSpotsArray, page: page, size: size})
});

module.exports = router;
