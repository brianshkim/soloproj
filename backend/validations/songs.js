const { check } = require('express-validator');
const { Songs } = require('../db/models/song');
const {handleValidationErrors} = require('./utils')


const id = check('id')
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
const attack = check('artist')
  .notEmpty()
  .withMessage('cannot be empty')
const defense = check('defense')
  .notEmpty()
  .withMessage('cannot be empty')
  .isInt({ min: 0, max: 100 })
  .toInt();
const imageUrl = check('imageUrl')
  .notEmpty()
  .withMessage('cannot be empty')
  .isURL({ require_protocol: false, require_host: false });
const name = check('name')
  .notEmpty()
  .withMessage('cannot be empty');
const type = check('type')
  .notEmpty()
  .withMessage('cannot be empty')
  .isIn(types);
const moves = check('moves').isArray();
