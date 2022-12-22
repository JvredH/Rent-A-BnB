const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User, sequelize, Spot, SpotImage } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async ( req, res, next ) => {
  const user = req.user;

  // console.log(user.id)

  const reviews = await Review.findAll({
    where: {
      userId: user.id
    },
    include: [
      {
        model: User
      },
      {
        model: Spot,
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: {model: SpotImage}
      },
      {
        model: ReviewImage,
        attributes: {exclude: ['createdAt', 'updatedAt', 'reviewId']}
      },
    ]
  })

  let reviewsArr = []
  reviews.forEach(review => {
    reviewsArr.push(review.toJSON())
  })

  for (let i = 0; i < reviewsArr.length; i++) {
    const reviewObj = reviewsArr[i];
    const spot = reviewObj.Spot
    const spotImages = spot.SpotImages
    for (let i = 0; i < spotImages.length; i++) {
      let image = spotImages[i];
      if (image.preview == true) {
        spot.previewImage = image.url
      }
    }
    if (!spot.previewImage) {
      spot.previewImage = 'No preview image available'
    }
    delete spot.SpotImages;
  }


  return res.json({ Reviews: reviewsArr })
})

module.exports = router;
