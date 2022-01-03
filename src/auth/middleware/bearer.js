'use strict';


const { users } = require('../models')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { _authError() }
      // console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ').pop();
    console.log(token);
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    console.log("Bearer catch");
    _authError();
  }

  function _authError() {
    console.log("Bearer");
    next('Invalid Login');
  }
}