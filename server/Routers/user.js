const registerUser = require('../Controllers/User/registerUser');
const loginUser = require('../Controllers/User/loginUser');
const updateUser = require('../Controllers/User/updateUser');
const auth = require('../Middlewares/auth');

const userRoutes = require('express').Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.patch('/update', auth, updateUser);

module.exports = userRoutes;