const { login } = require('../controllers/auth');
const router = require('express').Router();

router.get('/login', login);
module.exports = router;