const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js')
const albumsRouter = require('./albums.js')
const searchRouter = require('./search.js')
const playlistRouter = require('./playlist')



router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter)
router.use('/albums', albumsRouter)
router.use('/search', searchRouter);
router.use('/playlists', playlistRouter)




router.get('/require-auth', requireAuth, (req, res) => {
  return res.json(req.user);
}
);

router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
}));


router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
  }
);

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});



module.exports = router;
