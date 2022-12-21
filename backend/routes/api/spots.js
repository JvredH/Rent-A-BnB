const express = require('express');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, User, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors, validationSpots } = require('../../utils/validation');


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


router.post('/:spotId/images', requireAuth, async (req, res, next) => {
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




router.get('/', async (req, res, next) => {
  const allSpots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: ['stars'],
      },
      {
        model: SpotImage,
        attributes: ['url', 'preview']
      }
    ]
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

  res.json({Spots: allSpotsArray})
})

module.exports = router;
