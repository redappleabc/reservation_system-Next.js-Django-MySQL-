const fs = require('fs');
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: null,
    database: process.env.MYSQL_DATABASE_NAME,
    host: process.env.MYSQL_HOSTNAME,
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
    timezone: "+08:00",
    logging: false,
  },
  test: {
    username: process.env.MYSQL_USERNAME,
    password: null,
    database: process.env.MYSQL_DATABASE_NAME,
    host: process.env.MYSQL_HOSTNAME,
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
    timezone: "+08:00",
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: null,
    database: process.env.MYSQL_DATABASE_NAME,
    host: process.env.MYSQL_HOSTNAME,
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
    timezone: "+08:00",
    logging: false,
  },
};