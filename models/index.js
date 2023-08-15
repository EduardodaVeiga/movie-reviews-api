const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize;
sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  "host": process.env.DATABASE_HOST,
  "port": process.env.DATABASE_PORT,
  "dialect": process.env.DATABASE_DIALECT,
});

/*sequelize.sync({ force: true })
  .then(() => {
    console.log('All the tables have been recreated successfully');
  })
  .catch((error) => {
    console.error('There was an error while trying to re-create the tables:', error);
  });*/

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
