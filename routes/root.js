const express = require('express');
const router = express.Router();

const { index, indexChamp, summoners } = require('../controllers/root');

router.get('^\/$|index(.html)?', index);
router.get('/subdir/index_champ',indexChamp)
router.get('/summoners',summoners)

module.exports = router;