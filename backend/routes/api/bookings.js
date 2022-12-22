const express = require('express');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models')

const router = express.Router();

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

module.exports = router;
