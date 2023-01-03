const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, sequelize } = require('../../db/models');
const { HostNotFoundError } = require('sequelize');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const user = req.user
  const { imageId } = req.params;

  const image = await SpotImage.findByPk(imageId);


  if (!image) {
    res.status(404);
    return res.json({
      message: "Spot Image couldn't be found",
      statusCode: res.statusCode
    })
  }

  const spotId = image.spotId;

  const spot = await Spot.findByPk(spotId);


  if (spot.ownerId !== user.id) {
    res.status(403);
    return res.json({
      message: 'Forbidden',
      statusCode: res.statusCode
    })
  } else {
    image.destroy();
    res.status(200)
    return res.json({
      message: 'Successfully deleted',
      statusCode: res.statusCode
    })
  }
})

module.exports = router;
