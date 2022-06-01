const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.get('/', requireAuth, restoreUser, asyncHandler(async(req,res)=>{
    const playlists = await Playlist.findAll(
      {where:{
        user_id: req.user.id
      }
    }
    )
    res.json(playlists)

  }));

router.get(':playlistId/songs', restoreUser, asyncHandler(async(req,res)=>{
  const playlistsongs = await Playlist.findOne({
    where:{
      user_id:req.user.id
    },
    include:Song
  })
  res.json(playlistsongs)
}))

  router.post('/', requireAuth, asyncHandler(async(req,res)=>{
    const {name} = req.body
    console.log(name)
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
