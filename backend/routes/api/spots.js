const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, Review, User, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

router.get('/', async (req, res, next) => {
  const allSpots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: [
          // 'spotId',
          'stars',
          // [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
        ],
        group: 'spotId'
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

  const ratings = await Review.findAll({
    group: 'spotId',
    attributes:[
      'spotId',
      [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
    ]
  })

  ratingsJson = []

  ratings.forEach(rating => {
    ratingsJson.push(rating.toJSON())
  })

  for (let i = 0; i < allSpotsArray.length; i++) {
    let spot = allSpotsArray[i];
    // console.log(spot)
    for (let j = 0; j < ratingsJson.length; j++) {
      let ratingObj = ratingsJson[j];
      // console.log(ratingObj)
      if (spot.id === ratingObj.spotId) {
        spot.avgRating = ratingObj.avgRating;
        delete spot.Reviews
      }
    }
  }


  res.json({Spots: allSpotsArray})
})

module.exports = router;
