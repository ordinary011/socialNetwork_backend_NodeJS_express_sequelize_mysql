const router = require('express').Router();

const createUser = require('../controllers/user/userReg.js');
const getByName = require('../controllers/user/userGetByName.js');
const getById = require('../controllers/user/userGetById');

router.get('/', getByName);
router.get('/:user_id', getById);
router.post('/', createUser);

module.exports = router;
