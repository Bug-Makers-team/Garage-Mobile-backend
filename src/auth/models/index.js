"use strict";

const userModel=require('./users.js');
const serviceModel=require('./services.js');
const myServiceModel=require('./myservices.js')
const Collection=require('./date-Collection.js');

const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;


let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL,sequelizeOptions);



const Service = serviceModel(sequelize, DataTypes);
const myService = myServiceModel(sequelize, DataTypes);

module.exports = {

    db: sequelize,
    serviceRout:Service,
    users: userModel(sequelize, DataTypes),
    services:new Collection(Service),
    myservice:new Collection(myService)
  }