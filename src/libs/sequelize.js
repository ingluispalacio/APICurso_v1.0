const { Sequelize, Op } = require('sequelize');

const  { config } = require('../config/config');
const setupModels = require('../db');
  
const sequelize = new Sequelize(
    config.dbName, 
    config.dbUser,
    config.dbPassword, 
    {
      host: config.dbHost,
      dialect: 'mysql' 
    }
  );


setupModels(sequelize);

module.exports = {
  sequelize, 
  Op,
  models: sequelize.models
}