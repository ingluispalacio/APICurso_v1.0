const express = require('express');
const router = express.Router(); 
const authController = require('../../controllers/auth.controller');
const userController = require('../../controllers/user.controller');

router
    .post('/login', authController.login)
    .post('/register', userController.create);

module.exports = router;