"use strict";
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Review model
      Movie.hasMany(models.Review, {
        foreignKey: "tmdbId", // This should match the column name in the Review table
        sourceKey: "tmdbId", // This should match the column name in the Movie table
        as: "reviews", // Set an alias for the association
      });
    }
  }
  Movie.init(
    {
      movie_uuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
      },
      tmdbId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      release_date: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      is_adult:{
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      overview:{
        allowNull: false,
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      modelName: "Movie",
      tableName: "movies",
    }
  );
  return Movie;
};

