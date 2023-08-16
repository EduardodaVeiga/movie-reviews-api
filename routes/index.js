const express = require('express')
const router = express.Router()

const reviewRoute = require('./review.route.js')
const movieRoute = require('./movie.route.js')
const userRoute = require('./user.route.js')

// default route to make sure , it works.
router.get('/', function (req, res) {
  res.status(200).json({
    success: true,
    status: 200,
    message: 'Welcome Movie-Reviews api!!',
    data: {}
  })
})

router.use('/api/reviews', reviewRoute) // review routes
router.use('/api/movies', movieRoute) // movies routes
router.use('/api/users', userRoute) // users routes

module.exports = router
