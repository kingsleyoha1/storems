const router = require('express').Router();
const { register, login, userMe } = require('../controllers/AuthController')

router.get('/user', (...params) => userMe(...params))
router.post('/register', (...params) => register(...params))
router.post('/login', (...params) => login(...params))

module.exports = router;