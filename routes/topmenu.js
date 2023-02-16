const express = require('express');
const router = express.Router();

const { valorant, duo } = require('../controllers/topmenu');

router.get('/valorant', valorant);
router.get('/duo', duo);

module.exports = router;