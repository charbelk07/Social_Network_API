const router = require("express").Router();
const {
  getUsers,
  getSingleUser, //id
  createUser,
  updateUser, //id
  deleteUserById, //(user/id)
  addFriend, //(/user/friend/id)
  removeFriend,
} = require("../../controllers/userController.js");

//api/user
router.route("/").get(getUsers).post(createUser);

//api/user/:userId
router
  .route("/:userId")
  .put(updateUser)
  .get(getSingleUser)
  .delete(deleteUserById);

//api/userId/friend/:friendId
router.route("/:userId/friends/:friendId").delete(removeFriend).post(addFriend);

module.exports = router;
