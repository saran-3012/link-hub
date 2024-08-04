const registerUser = require('../Controllers/User/registerUser');
const loginUser = require('../Controllers/User/loginUser');
const updateUser = require('../Controllers/User/updateUser');
const viewUser = require('../Controllers/User/viewUser');
const auth = require('../Middlewares/auth');

const userRoutes = require('express').Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.patch('/update', auth, updateUser);
userRoutes.get('/view', auth, viewUser);

module.exports = userRoutes;