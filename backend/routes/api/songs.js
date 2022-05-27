const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router()
const {User, Song} = require('../../db/models')


router.get('/', asyncHandler(async (req,res)=>{
    const songs = await Song.findAll()
    res.json(songs)
    })
)

//router.get('/search', asyncHandler(async (req,res)=>{




module.exports = router
