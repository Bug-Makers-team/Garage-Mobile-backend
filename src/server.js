"use strict";

const express=require('express');
const app =express();
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const PORT=process.env.PORT || 8080;
const Error404Handlers=require('./error-handlers/404');
const Error500Handler=require('./error-handlers/500');
const authRoutes = require('../src/auth/routes/routes.js');

app.get('/',(req,res)=>{
    res.status(200).send('Hello from BUG-MAKERS 🤍')
})


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(authRoutes);
app.use('*',Error404Handlers);
app.use(Error500Handler);

module.exports = {
    server: app,
    start: PORT => {
      if (!PORT) { throw new Error('Missing Port'); }
      app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    },
  };
  