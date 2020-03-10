const router = require('express').Router();

const checkToken = require('../middlewares/checkToken');

const addFriend = require('../controllers/friend/addFriend.js');
const deleteFriend = require('../controllers/friend/deleteFriend.js');
const getAllFriends = require('../controllers/friend/getAllFriends.js');

router.post('/:id', checkToken, addFriend);
router.delete('/:id', checkToken, deleteFriend);
router.get('/', checkToken, getAllFriends);

module.exports = router;
