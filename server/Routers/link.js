const createLink = require('../Controllers/Link/createLink');
const getLinks = require('../Controllers/Link/getLinks');
const updateLink = require('../Controllers/Link/updateLink');
const deleteLink = require('../Controllers/Link/deleteLink');
const shareLinks = require('../Controllers/Link/shareLinks');
const auth = require('../Middlewares/auth');
const verifyUser = require('../Middlewares/verifyUser');

const linkRoutes = require('express').Router();

linkRoutes.get('/', auth, getLinks);
linkRoutes.post('/create', auth, createLink);
linkRoutes.patch('/update/:id', auth, verifyUser, updateLink);
linkRoutes.delete('/delete/:id', auth, verifyUser, deleteLink);
linkRoutes.get('/:username', shareLinks);

module.exports = linkRoutes;