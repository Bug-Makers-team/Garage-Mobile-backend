'use strict';

const serviceModel = (sequelize, DataTypes) => sequelize.define('Service', {
  name: { type: DataTypes.STRING, required: true },
  description: { type: DataTypes.STRING, required: true },
  price: { 
      type: DataTypes.INTEGER,
       required: true },
  imgURL:{type: DataTypes.STRING, required: true}
});

module.exports = serviceModel;