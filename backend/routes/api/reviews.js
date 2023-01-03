const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User, sequelize, Spot, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { validationReviews } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    // .exists({ checkFalsy: true })
    .isInt({min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5'),
  validationReviews
];


// add an image to a review based on the reviews id
router.post('/:reviewId/images', requireAuth, async ( req, res, ) => {
  const user = req.user;
  const { reviewId } = req.params
  const { url } = req.body

  const review = await Review.findByPk(reviewId);

  if (!review) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: res.statusCode
    })
  }

  if (user.id !== review.userId) {
    res.status(403);
    return res.json({
      message: 'Forbidden',
      statusCode: res.status
    })
  }

  const reviewImages = await ReviewImage.findAll({
    where: {
      reviewId: reviewId
    }
  })

  if (reviewImages.length >= 10) {
    res.status(403);
    return res.json({
      message: 'Maximum number of images for this resource was reached',
      statusCode: res.statusCode
    })
  }

  const newReview = await ReviewImage.create({
    url,
    reviewId
  })

  const response = {
    id: newReview.id,
    url: newReview.url,
  }

  res.json(response)
})

router.get('/current', requireAuth, async ( req, res, next ) => {
  const user = req.user;

  const reviews = await Review.findAll({
    where: {
      userId: user.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: {model: SpotImage}
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
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

// Edit a review
router.put('/:reviewId', requireAuth, validateReview, async ( req, res, next ) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;
  const user = req.user;

  const reviewToUpdate = await Review.findByPk(reviewId);

  if (!reviewToUpdate) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: res.statusCode
    })
  }

  if (reviewToUpdate.userId !== user.id) {
    res.status(403);
    return res.json({
      message: 'Forbidden',
      statusCode: res.statusCode
    })
  }

  if(review) reviewToUpdate.set( {review} )
  if(stars) reviewToUpdate.set( {stars} )

  await reviewToUpdate.save()

  return res.json(reviewToUpdate)
})

// delete a review
router.delete('/:reviewId', requireAuth, async ( req, res, next ) => {
  const { reviewId } = req.params;
  const user = req.user;

  const review = await Review.findByPk(reviewId);

  if (!review) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: res.statusCode
    })
  }

  if (user.id !== review.userId) {
    res.status(403);
    return res.json({
      message: 'Forbidden',
      statusCode: res.statusCode
    })
  } else {
    await review.destroy();
    res.status(200)
    return res.json({
      message: 'Successfully Deleted',
      statusCode: res.statusCode
    })
  }

})

module.exports = router;
