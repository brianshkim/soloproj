const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { user } = require('pg/lib/defaults');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
        user
    });
})
);

router.get('/songs', requireAuth, asyncHandler(async(req,res)=>{
  const songs = await Song.findAll(
    {where:req.user.id}
  )
  res.json({songs})

}));




router.get('/playlist', requireAuth, asyncHandler(async(req,res)=>{
  const playlists = await Playlist.findAll(
    {where:req.user.id}
  )
  res.json({playlists})

}));

router.post('/playlists', requireAuth, asyncHandler(async(req,res)=>{
  const {name} = req.body




}))


router.put('/playlists/:playlistId', requireAuth, asyncHandler(async(req,res)=>{




}))

router.delete('/playlists/:playlistId', requireAuth, asyncHandler(async(req,res)=>{

}))




module.exports = router;
