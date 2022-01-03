'use strict';

const myServiceModel = (sequelize, DataTypes) => sequelize.define('MyServicess', {
  user_id: { type: DataTypes.STRING, required: true },
  nameOfServices: { type: DataTypes.STRING, required: true,unique: true },
  description: { type: DataTypes.STRING, required: true },
  price: { 
      type: DataTypes.STRING,
       required: true },
  imgURL:{type: DataTypes.STRING, required: true}
});

module.exports = myServiceModel;