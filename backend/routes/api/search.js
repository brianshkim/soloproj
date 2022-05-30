const { setTokenCookie, requireAuth } = require('../../utils/auth');
const express = require('express')
const asyncHandler = require('express-async-handler');
const { User, Song, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const {Op} = require('sequelize')


const router = express.Router();

router.post('/', asyncHandler(async(req,res)=>{
    const {search} = req.body;
    console.log(search)
    const songs = await Song.findAll({
        where:{
            title:{
                [Op.iLike]: `%${search}%`
            }
        }

    })
    res.json({songs})

  }));


  module.exports = router
