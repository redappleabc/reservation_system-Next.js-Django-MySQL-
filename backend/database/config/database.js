const db = require("../models");
const sequelize = db.sequelize;

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  db,
  sequelize,
  testDatabaseConnection
}