const express = require('express')
const router = express.Router()

const { createReview } = require('../controllers/review/review.controller')
const { postReviewValidation } = require('../helpers/validation_helper')

router.post('/', postReviewValidation, createReview)

module.exports = router
