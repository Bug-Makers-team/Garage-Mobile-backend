'use strict';

const myServiceModel = (sequelize, DataTypes) => sequelize.define('MyService', {
  username: { type: DataTypes.STRING, required: true },
  nameOfServices: { type: DataTypes.STRING, required: true,unique: true },
  description: { type: DataTypes.STRING, required: true },
  price: { 
      type: DataTypes.INTEGER,
       required: true },
  imgURL:{type: DataTypes.STRING, required: true}
});

module.exports = myServiceModel;