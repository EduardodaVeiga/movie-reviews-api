const request = require('supertest')
const app = require('../app')
const models = require('../models/index')

const { getMessage } = require('../helpers/message_helper')

describe('GET /api/movies/:tmdbId/reviews', () => {
  afterAll(async () => {
    await models.Review.destroy({ where: {} }) // Clean the table Reviews
    await models.Movie.destroy({ where: {} }) // Clean the table Movies
    await models.sequelize.close()
  })
  it('should retrieve reviews for a valid tmdbId', async () => {
    await createReviews()
    const tmdbId = '255'

    const response = await request(app)
      .get(`/api/movies/${tmdbId}/reviews`)
      .expect(200)

    expect(response.body.success).toBe(true)
    expect(response.body.data).toHaveLength(2) // Number of expected reviews
  })

  it('should return 204 if no reviews found for a tmdbId', async () => {
    const tmdbId = '420'

    await request(app)
      .get(`/api/movies/${tmdbId}/reviews`)
      .expect(204)
  })

  it('should return 500 for server error', async () => {
    const tmdbId = '123'

    models.Review.findAll = jest.fn().mockRejectedValue(new Error('Database error'))

    await request(app)
      .get(`/api/movies/${tmdbId}/reviews`)
      .expect(500)
  })

  it('should return 400 for invalid parameters', async () => {
    const tmdbId = 'invalid-tmdb-id'

    await request(app)
      .get(`/api/movies/${tmdbId}/reviews`)
      .expect(400)
      .expect((response) => {
        expect(response.body.error).toBe(getMessage('invalid_parameters'))
      })
  })
})
const createReviews = async () => {
  let tmdbId = '255'
  let userName = 'Ed-movies_test.test'
  let rating = 4

  await request(app)
    .post('/api/reviews')
    .send({ tmdbId, userName, rating })

  tmdbId = '255'
  userName = 'Ed-movies_test.test'
  rating = 8
  await request(app)
    .post('/api/reviews')
    .send({ tmdbId, userName, rating })
}
