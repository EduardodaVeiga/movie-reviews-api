const express = require("express");
const router = express.Router();

const { retrieveReviewsByUser } = require("../controllers/user/user.controller");

router.get('/:userName/reviews', retrieveReviewsByUser)

module.exports = router;