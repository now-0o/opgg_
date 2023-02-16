const express = require('express');
const router = express.Router();

const { login, registerAge, registerAgree, registerInfo } = require('../controllers/login');

router.get('/', login);
router.get('/register', registerAge);
router.get('/register2', registerAgree);
router.get('/register3', registerInfo);

module.exports = router;