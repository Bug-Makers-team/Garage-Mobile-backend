"use strict";

const { start } = require('./src/server');
const { db } = require('./src/auth/models');
const PORT =process.env.PORT || 8080;
// we first connect to the DB, then we run our server
db.sync().then(() => {
  // kickstart the server
  start(PORT); // will start our server
}).catch(console.error);