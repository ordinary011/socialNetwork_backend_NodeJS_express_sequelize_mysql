const router = require('express').Router();

const checkToken = require('../middlewares/checkToken');

const userAuth = require('../controllers/auth/userAuth');
const sendChangeEmail = require('../controllers/auth/sendChangeEmail');
const confirmPasswordChange = require('../controllers/auth/confirmPasswordChange');
const refreshToken = require('../controllers/auth/refreshToken');

router.post('/', userAuth);
router.post('/refresh-token', refreshToken);
router.post('/password-change', checkToken, sendChangeEmail);
router.post('/password-confirm', checkToken, confirmPasswordChange);

module.exports = router;
