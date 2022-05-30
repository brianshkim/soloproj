const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Playlist } = require('../../db/models');
const { check } = require('express-validator');

const router = express.Router();

router.get('/playlist', requireAuth, asyncHandler(async(req,res)=>{
    const playlists = await Playlist.findAll(
      {where:{
        user_id: req.user.id
      }
    }
    )
    res.json({playlists})

  }));

  router.post('/playlists', requireAuth, asyncHandler(async(req,res)=>{
    const {name} = req.body
    const playlist = await Playlist.create({
        name,
        user_id: req.user.id
    })

    return res.json(playlist)


  }))


  router.put('/playlists/:playlistId', requireAuth, asyncHandler(async(req,res)=>{

    const {name} = req.body
    let id = parseInt(req.params.id,10)
    const playlist = await Playlist.update(
        name,
        {
            where: id
        }
    )

    return res.json(playlist)


  }))

  router.delete('/playlists/:playlistId', requireAuth, asyncHandler(async(req,res)=>{

    const id = await(Playlist.destroy({
        where: parseInt(req.params.id, 10)
    }))
    return res.json(id)
  }))

  module.exports = router
