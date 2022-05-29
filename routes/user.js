const userController = require('../controllers/userController');
var express = require('express');
var router = express.Router();

router.post('/signup', userController.register);

router.post('/login', userController.login);

module.exports = router;
