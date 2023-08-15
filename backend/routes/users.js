const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUserById, updateUserAvatar, login, getUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUserById);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
