require('dotenv').config()
const { Sequelize } = require('sequelize')

let DATABASE_HOST
let DATABASE_DIALECT
let DATABASE_PORT
let DATABASE_NAME
let DATABASE_USERNAME
let DATABASE_PASSWORD

if (process.env.NODE_ENV === 'test') {
  DATABASE_NAME = process.env.TEST_DATABASE_NAME
  DATABASE_USERNAME = process.env.TEST_DATABASE_USERNAME
  DATABASE_PASSWORD = process.env.TEST_DATABASE_PASSWORD
  DATABASE_HOST = process.env.TEST_DATABASE_HOST
  DATABASE_DIALECT = process.env.TEST_DATABASE_DIALECT
  DATABASE_PORT = process.env.TEST_DATABASE_PORT
} else {
  DATABASE_NAME = process.env.DATABASE_NAME
  DATABASE_USERNAME = process.env.DATABASE_USERNAME
  DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
  DATABASE_HOST = process.env.DATABASE_HOST
  DATABASE_DIALECT = process.env.DATABASE_DIALECT
  DATABASE_PORT = process.env.DATABASE_PORT
}

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    logging: false,
    port: DATABASE_PORT,
    dialect: DATABASE_DIALECT,
    keepDefaultTimezone: false,
    dialectOptions: {
      useUTC: false // for reading from database
    },
    timezone: '+00:00', // for writing to database
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  }
)

module.exports = sequelize
