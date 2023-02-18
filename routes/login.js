const express = require('express');
const router = express.Router();

const { login, loginPost, registerAge, registerAgree, registerInfo, registerInfoPost, registerdone } = require('../controllers/login');

router.get('/', login);
router.post('/', loginPost);
router.get('/register/age', registerAge);
router.get('/register/agree', registerAgree);
router.get('/register/userInfo', registerInfo);
router.post('/register/userInfo', registerInfoPost);
router.get('/register/done', registerdone);


module.exports = router;