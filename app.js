var express = require('express');
var app = express();
require("dotenv").config();
const indexRouter = require("./routes/index");
const sequelize = require("./config/database");
var cors = require('cors');

var port = process.env.PORT || 3009;
app.set("port", port);


// cross platform support
app.use(cors(
  origin = "*" //Only for testing purposes, if sent to production change to desired host
));

app.use(express.json());
app.use("/", indexRouter);

try {
  sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Check for Invalid request // catch 404
app.use(function(req, res, next) {
  res.status(404).json({
    status: 404,
    success: false,
    message: "Not Found",
    data: {},
  });
});


module.exports = app;