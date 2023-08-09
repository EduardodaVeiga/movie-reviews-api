const { validationResult } = require("express-validator");
const { getMessage } = require("../../helpers/message_helper")
const models = require("../../models/index")
const { retrieveMovieFromIMDB } = require("../../helpers/movie_helper")
const sequelize = require("../../config/database");

class ReviewController {
  /**
 * @param req request body
 * @param res callback response object
 * @description Method to create review
 * @date 08th August 2023
 * @updated 08th August 2023
 */
  static async createReview(req, res) {
    const { errors } = validationResult(req)

    if (errors.length > 0) {
      return res.status(400).json({ success: false, error: getMessage('invalid_body') });
    } else {
      const transaction = await sequelize.transaction()
      try {
        const { tmdbId, userName, rating } = req.body

        const Movie = await models.Movie.findOne({
          where: { tmdbId }
        })
        if (Movie) { //Movie is already in the database
          await models.Review.create({
            tmdbId, userName, rating
          }, transaction)
        } else { //We should add the movie to database

          const external_movie = await retrieveMovieFromIMDB(tmdbId)

          await models.Movie.create({
            tmdbId: external_movie.id,
            title: external_movie.title,
            release_date: external_movie.release_date,
            is_adult: external_movie.adult,
            overview: external_movie.overview
          }, { transaction });

          await models.Review.create({
            tmdbId,
            userName,
            rating
          }, { transaction });
        }
      } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ success: false, message: getMessage('exception_error') });
      }
      await transaction.commit();
      return res.status(200).json({ success: true, message: getMessage('review_creation_sucess') });
    }
  }

}

module.exports = ReviewController;