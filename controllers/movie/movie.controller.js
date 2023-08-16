const { validationResult } = require('express-validator')
const { getMessage } = require('../../helpers/message_helper')
const models = require('../../models/index')

class MovieController {
  /**
 * @param req request body
 * @param res callback response object
 * @description Method to retrieve movie reviews by tmdbId
 * @date 08th August 2023
 * @updated 08th August 2023
 */
  static async retrieveReviewsById (req, res) {
    const { errors } = validationResult(req)

    if (errors.length > 0) {
      return res.status(400).json({ success: false, error: getMessage('invalid_parameters') })
    }
    const { tmdbId } = req.params
    let reviews
    try {
      reviews = await models.Review.findAll({
        where: {
          tmdbId
        }
      })
    } catch (error) {
      return res.status(500).json({ success: false, message: getMessage('exception_error') })
    }

    if (reviews.length === 0) {
      return res.status(204).json()
    }
    return res.status(200).json({ success: true, data: reviews })
  }
}

module.exports = MovieController
