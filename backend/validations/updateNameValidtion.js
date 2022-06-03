const { check } = require('express-validator');
const { Songs } = require('../db/models/song');
const {handleValidationErrors} = require('./utils')


const userId = check('user_id')
  .notEmpty()
  .withMessage('cannot be empty')
  .isInt({ min: 0 });
const title= check('title')
  .notEmpty()
  .withMessage('cannot be empty')
const releaseDate = check('releaseDate')
  .notEmpty()
  .withMessage('cannot be empty')
  .isISO8601();
const albumName = check('albumName')
  .isLength({min:2, max:200})
  .withMessage('must be greater than 2 characters and less than 200')
const imagePath = check("imagePath")
  .isURL()
  .withMessage('must be a valid url address')
