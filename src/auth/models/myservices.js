'use strict';

const myServiceModel = (sequelize, DataTypes) => sequelize.define('MyServices', {
  user_id: { type: DataTypes.STRING, required: true ,unique:true },
  nameOfServices: { type: DataTypes.STRING, required: true},
  description: { type: DataTypes.STRING, required: true },
  price: { 
      type: DataTypes.STRING,
       required: true },
  imgURL:{type: DataTypes.STRING, required: true}
});

module.exports = myServiceModel;