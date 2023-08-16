const request = require('supertest')
const app = require('../app')
const models = require('../models/index')

describe('GET /api/user/:userName/reviews', () => {
  afterAll(async () => {
    await models.Review.destroy({ where: {} }) // Clean the table Reviews
    await models.Movie.destroy({ where: {} }) // Clean the table Movies
    await models.sequelize.close()
  })

  it('should retrieve reviews for a valid user', async () => {
    await createReviews()
    const userName = 'Ed-users_test.test'
    const response = await request(app)
      .get(`/api/users/${userName}/reviews`)
      .expect(200)

    expect(response.body.success).toBe(true)
    expect(response.body.data).toHaveLength(2) // Number of expected reviews
  })

  it('should return 204 if no reviews found for a user', async () => {
    const userName = 'userWithNoReviews'

    await request(app)
      .get(`/api/users/${userName}/reviews`)
      .expect(204)
  })

  it('should return 500 for server error', async () => {
    const userName = 'validUserName'

    models.Review.findAll = jest.fn().mockRejectedValue(new Error('Database error'))

    await request(app)
      .get(`/api/users/${userName}/reviews`)
      .expect(500)
  })
})

const createReviews = async () => {
  let tmdbId = '123'
  let userName = 'Ed-users_test.test'
  let rating = 4

  await request(app)
    .post('/api/reviews')
    .send({ tmdbId, userName, rating })

  tmdbId = '124'
  userName = 'Ed-users_test.test'
  rating = 8
  await request(app)
    .post('/api/reviews')
    .send({ tmdbId, userName, rating })
}
