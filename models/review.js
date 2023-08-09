"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Define association with Movie model
      Review.belongsTo(models.Movie, {
        foreignKey: "tmdbId", // This should match the column name in the Movie table
        targetKey: "tmdbId", // This should match the column name in the Review table
        as: "movie", // Set an alias for the association
      });
    }
  }
  Review.init(
    {
      review_uuid: { //unique identifier for the review inside our db
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
      },
      tmdbId: { //the unique identifier (ID) for each movie in TheMovieDb API
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userName: { //Reviewer's name
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: { //Rating - number on a scale of 1 to 10
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "reviews",
    }
  );
  return Review;
};