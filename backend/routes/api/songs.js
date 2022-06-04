const express = require('express')
const asyncHandler = require('express-async-handler');
const songValidation = require("../../validations/songValidation")
const { Op } = require("sequelize")
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { singlePublicFileUpload, singleMulterUpload } = require('../../aws53');
const { handleValidationErrors } = require('../../validations/utils');

const router = express.Router();





const validateSongs = [
  check('user_id')
    .notEmpty()
    .withMessage('cannot be empty')
    .isInt({ min: 0 }),
  check('title')
    .notEmpty()
    .withMessage('cannot be empty'),
  releaseDate = check('releaseDate')
    .notEmpty()
    .withMessage('cannot be empty')
    .isISO8601(),
  check('albumName')
    .isLength({ min: 2, max: 200 })
    .withMessage('must be greater than 2 characters and less than 200'),
  check("imagePath")
    .isURL()
    .withMessage('must be a valid url address'),
  handleValidationErrors
];


router.get('/', asyncHandler(async (req, res) => {

  const songs = await Song.findAll()

  res.json(songs)

}))


router.get('/home', restoreUser, asyncHandler(async (req, res) => {
  const songs = await Song.findAll({
    where: {
      user_id: req.user.id
    },
    include:Album
  })
  res.json(songs)

}))





router.post('/', singleMulterUpload('image'),  requireAuth, restoreUser, asyncHandler(async (req, res, next) => {
  let { title, releaseDate, artist, imagePath, albumName, user_id, album_id } = req.body
  const songPath = await singlePublicFileUpload(req.file)


  let album = await Album.findOne({
    where: {
      title: {
        [Op.iLike]: albumName
      }
    }
  })
  if (album) album_id = album.id
  else {
    newalbum = await Album.create({
      title: albumName,
      user_id: req.user.id,
      releaseDate
    })
    album_id = newalbum.id

  }




  let newSong = await Song.create({
    title,
    releaseDate,
    artist,
    songPath,
    imagePath,
    albumName,
    user_id,
    album_id

  })

  res.json(newSong)



}))


router.put('/:songid', requireAuth, asyncHandler(async (req, res) => {

  const id = parseInt(req.params.songid, 10)
  console.log(id)
  const song = await Song.findByPk(id)
  console.log(song)
  const { title, releaseDate, artist, songPath, imagePath, albumName } = req.body
  await song.update({
    title,
    releaseDate,
    artist,
    songPath,
    imagePath,
    albumName

  })
  await song.save()

  return res.json(song)



}))

router.put('/:songid/addtoplaylist', requireAuth, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.songid, 10)
  const song = await Song.findByPk(id)
  const { playlist_id } = req.body
  await song.update({
    playlist_id
  })
  await song.save()
  return res.json(song)
}))

router.delete('/:songId', requireAuth, asyncHandler(async (req, res) => {
  const id = req.params.songId
  let deleted = await Song.findByPk(id)
  await deleted.destroy()

  res.json(deleted)

}))
//router.get('/search', asyncHandler(async (req,res)=>{




module.exports = router
