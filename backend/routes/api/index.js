const router = require('express').Router();
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);
// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });
/* TESTING THE USER AUTH MIDDLEWARE ROUTES
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user: user });
});
*/

module.exports = router;
