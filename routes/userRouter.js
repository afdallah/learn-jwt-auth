const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/auth');

// controllers
const user = require('../controllers/userController');

// register
router.post('/', user.create);
router.post('/register', user.create);

router.get('/', isAuthenticated, user.getAll);
router.post('/login', user.login);
router.put('/', isAuthenticated, user.update);

module.exports = router;