const request = require('supertest')
const app = require('../app')
const models = require('../models/index')

const { getMessage } = require('../helpers/message_helper')

describe('POST /reviews', () => {
  afterAll(async () => {
    await models.Review.destroy({ where: {} }) // Clean the table Reviews
    await models.Movie.destroy({ where: {} }) // Clean the table Movies
    await models.sequelize.close()
  })
  it('should create a new movie and review', async () => {
    const tmdbId = '123'
    const userName = 'Ed'
    const rating = 4

    const response = await request(app)
      .post('/api/reviews')
      .send({ tmdbId, userName, rating })
      .expect(200)

    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe(getMessage('review_creation_sucess'))
  })
  it('should create a new review for an existing movie', async () => {
    const tmdbId = '123'
    const userName = 'Ed'
    const rating = 4

    const response = await request(app)
      .post('/api/reviews')
      .send({ tmdbId, userName, rating })
      .expect(200)

    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe(getMessage('review_creation_sucess'))
  })

  it('should return movie not found on imdb', async () => {
    const tmdbId = '456'
    const userName = 'Ed'
    const rating = 5

    const response = await request(app)
      .post('/api/reviews')
      .send({ tmdbId, userName, rating })
      .expect(404)

    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe(getMessage('movie_not_found_imdb'))
  })

  it('should return 400 for invalid request body', async () => {
    await request(app)
      .post('/api/reviews')
      .send({})
      .expect(400)
      .expect((response) => {
        expect(response.body.success).toBe(false)
        expect(response.body.error).toBe(getMessage('invalid_body'))
      })
  })
})
