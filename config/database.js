require("dotenv").config();
const { Sequelize } = require("sequelize");

let DATABASE_NAME = process.env.DATABASE_NAME;
let DATABASE_USERNAME = process.env.DATABASE_USERNAME;
let DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
let DATABASE_HOST = process.env.DATABASE_HOST;
let DATABASE_DIALECT = process.env.DATABASE_DIALECT;
let DATABASE_PORT = process.env.DATABASE_PORT;


const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: DATABASE_DIALECT,
    keepDefaultTimezone: false,
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: "+00:00", // for writing to database
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
