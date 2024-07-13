const registerUser = require('../Controllers/User/registerUser');
const loginUser = require('../Controllers/User/loginUser');

const userRoutes = require('express').Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);

module.exports = userRoutes;