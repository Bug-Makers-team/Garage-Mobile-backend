'use strict';

const serviceModel = (sequelize, DataTypes) => sequelize.define('AdminService', {
  name: { type: DataTypes.STRING, required: true },
  description: { type: DataTypes.STRING, required: true },
  category: { type: DataTypes.STRING, required: true },
  price: { type: DataTypes.STRING,required: true },
  imgURL:{type: DataTypes.STRING, required: true}
});

module.exports = serviceModel;