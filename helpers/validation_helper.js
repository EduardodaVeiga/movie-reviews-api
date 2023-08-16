const { body, param } = require('express-validator')

const postReviewValidation = [
  body('tmdbId').isInt(),
  body('userName').notEmpty().isString(),
  body('rating').isInt({ min: 1, max: 10 })
]

const retrieveReviewsByIdValidation = [
  param('tmdbId').isInt()
]

module.exports = {
  postReviewValidation,
  retrieveReviewsByIdValidation
}
