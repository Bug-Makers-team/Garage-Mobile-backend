'use strict';

const express = require('express');
const authRouter = express.Router();

//
const { users,serviceRout } = require('../models/index');
const basicAuth = require('../middleware/basic')
const bearerAuth = require('../middleware/bearer')
const permissions = require('../middleware/acl')


authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = ['Id: '+userRecord.id,'Username: '+userRecord.username,'Password: '+userRecord.password,'Email: '+ userRecord.email,'Phone Number: '+userRecord.phoneNum,'Role: '+ userRecord.role,]
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth,permissions('admin'),async (req, res, next) => {

  const userRecords = await users.findAll({});
  let list=[];
   userRecords.forEach(user => {
    list.push(user.username,user.id);
  });
  res.status(200).json(list);
});

authRouter.delete(`/users/:id`, bearerAuth, permissions('admin'), async (req, res, next) => {
  let id = req.params.id;
  try{
    let deletedRecord= await users.destroy({where:{id}})
    res.status(200).json(deletedRecord);
}catch(err){console.log(err);}

}),

authRouter.put(`/users/:id`, bearerAuth, permissions('admin'), async (req, res, next) => {
  let id = req.params.id;
  const obj = req.body;
  try{
    let findRecord= await users.findOne({where:{id}});
    let updatedRecord= await findRecord.update(obj);
    res.status(200).json(updatedRecord);
}catch(err){console.log(err);}

}),
authRouter.post(`/users`, bearerAuth, permissions('admin'), async (req, res, next) => {
  let obj = req.body;
  let newRecord = await users.create(obj);
  res.status(201).json(newRecord);
}),

authRouter.get('/services',async (req, res, next) => {

  const userRecords = await serviceRout.findAll({});
  let list=[];
   userRecords.forEach(service => {
    list.push(service);
  });
  res.status(200).json(list);
});



module.exports = authRouter;