const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// adi users
router.route('/').get(getUsers).post(createUser);

// api users -- userID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// api users -- userID friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
