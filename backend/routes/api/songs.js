const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser} = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');
const { check } = require('express-validator');

const router = express.Router();


router.get('/', asyncHandler(async (req,res)=>{
    const songs = await Song.findAll()

    res.json(songs)

    })
)


router.post('/', requireAuth, asyncHandler(async(req,res)=>{
    const {title, releaseDate, artist, songPath, imagePath, albumName, albumReleaseDate} = req.body


    let newSong = await Song.create({
      title,
      releaseDate,
      artist,
      songPath,
      imagePath,
      albumName,
      user_id: req.user.id,

    })

    res.json(newSong)



  }))


  router.put('/:songid', requireAuth, asyncHandler(async(req,res)=>{

    const {title, releaseDate, artist, songPath, imagePath, albumName} = req.body
    let editSong = await Song.update({
      title,
      releaseDate,
      artist,
      songPath,
      imagePath,
      albumName

    })

    return res.json(editSong)



  }))

  router.delete('/:songId', requireAuth, asyncHandler(async(req,res)=>{
      let deleted = Song.destroy({
          where: parseInt(req.params.songId, 10)
      })

      res.json(deleted)

  }))
//router.get('/search', asyncHandler(async (req,res)=>{




module.exports = router
