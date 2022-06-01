const express = require('express')
const asyncHandler = require('express-async-handler');
const songValidation = require("../../validations/songValidation")

const { setTokenCookie, requireAuth, restoreUser} = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');
const { check } = require('express-validator');
const { singlePublicFileUpload, singleMulterUpload }= require('../../aws53');

const router = express.Router();


router.get('/',  asyncHandler(async (req,res)=>{

    const songs = await Song.findAll()

    res.json(songs)

    }))


router.get('/home', restoreUser, asyncHandler(async(req,res)=>{
  const songs = await Song.findAll({
    where:{
      user_id: req.user.id
    }
  })
  res.json(songs)

}))



router.post('/', requireAuth, singleMulterUpload('image'), songValidation.validateCreate, asyncHandler(async(req,res)=>{
    const {title, releaseDate, artist, imagePath, albumName, user_id, album_id} = req.body
    const songPath = await singlePublicFileUpload(req.file)


    let newSong = await Song.create({
      title,
      releaseDate,
      artist,
      songPath: songPath,
      imagePath,
      albumName,
      user_id,
      album_id

    })

    res.json(newSong)



  }))


  router.put('/:songid', requireAuth, asyncHandler(async(req,res)=>{

    const id = parseInt(req.params.songid, 10)
    console.log(id)
    const song = await Song.findByPk(id)
    console.log(song)
    const {title, releaseDate, artist, songPath, imagePath, albumName} = req.body
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

  router.delete('/:songId', requireAuth, asyncHandler(async(req,res)=>{
    const id = req.params.songId
      let deleted = await Song.findByPk(id)
      await deleted.destroy()

      res.json(deleted)

  }))
//router.get('/search', asyncHandler(async (req,res)=>{




module.exports = router
