const express = require('express');
const router = express.Router();

const book = require('../controllers/bookController');

router.get('/', book.getAll);
router.post('/', book.create);
router.put('/', book.update);

module.exports = router;