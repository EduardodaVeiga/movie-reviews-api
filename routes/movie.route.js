const express = require('express')
const router = express.Router()

const { retrieveReviewsById } = require('../controllers/movie/movie.controller')
const { retrieveReviewsByIdValidation } = require('../helpers/validation_helper')

router.get('/:tmdbId/reviews', retrieveReviewsByIdValidation, retrieveReviewsById)

module.exports = router
