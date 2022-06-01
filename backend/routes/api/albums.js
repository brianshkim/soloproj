const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');
const { check } = require('express-validator');

const router = express.Router();



router.get('/', asyncHandler(async (req,res)=>{
    const album = await Album.findAll()

    res.json(album)
    })
)

router.get('/user', restoreUser, asyncHandler(async (req,res)=>{

    const album = await Album.findAll({where: {
        user_id:req.user.id
}})

    res.json(album)
    })
)

router.post('/', requireAuth, restoreUser, asyncHandler(async(req,res)=>{
    const {title, releaseDate, imagePath} = req.body

    const album = await Album.create({
      title,

      user_id: req.user.id,
      releaseDate,
      user_id,
      imagePath,

    })

    res.json(newSong)



  }))
router.put('/:albumId', requireAuth, asyncHandler(async(req,res)=>{
    const {title, releaseDate, imagePath} = req.body

    const album = await Album.update({
        title, releaseDate, imagePath
    })
}))
router.delete('/:albumId', requireAuth, asyncHandler(async(req,res)=>{
    let deleted = Album.destroy({
        where: parseInt(req.params.songId, 10)
    })

    res.json(deleted)
}))

module.exports = router
