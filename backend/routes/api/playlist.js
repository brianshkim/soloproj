const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.get('/', requireAuth, restoreUser, asyncHandler(async (req, res) => {
  const playlists = await Playlist.findAll(
    {
      where: {
        user_id: req.user.id
      }
    }
  )
  res.json(playlists)

}));

router.get('/:playlistId/songs', restoreUser, asyncHandler(async (req, res) => {

  const playlistid = parseInt(req.params.playlistId, 10)

  const playlistsongs = await Song.findAll({
    where: {
      playlist_id: playlistid
    }
  })


  res.json(playlistsongs)
}))

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { name } = req.body

  const playlist = await Playlist.create({
    name,
    user_id: req.user.id
  })

  return res.json(playlist)


}))



router.put('/:playlistId', requireAuth, asyncHandler(async (req, res) => {

  const { name } = req.body
  let id = parseInt(req.params.id, 10)
  const playlist = await Playlist.update(
    name,
    {
      where: id
    }
  )

  return res.json(playlist)


}))

router.delete('/:playlistId', requireAuth, asyncHandler(async (req, res) => {

  const playlist_id = parseInt(req.params.playlistId, 10)
  const songs = await Song.findAll()
  console.log(songs)
  for (let song of songs) {
    console.log(song.playlist_id)
    if (song.playlist_id===playlist_id){
      await song.update({
        playlist_id: null
      })
    }

  }

  await Playlist.destroy({
    where: {
      id: playlist_id
  }})

  return res.json(playlist_id)
}))

module.exports = router
