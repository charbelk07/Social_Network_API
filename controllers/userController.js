const { Reaction, Thought, User } = require("../models");

module.exports = {
  //GET all users
  async getUsers(req, res) {
    try {
      const users = await Users.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET a single user by its _id and populated thought and friend data
  async getSingleUser(req, res) {
    try {
      const user = await user
        .findOne({ _id: req.params.userId })
        .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No User with that ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //POST a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //PUT to update a user by its _id//
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No User with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE to remove user by its _id

  //>>>>/api/users/:userId/friends/:friendId<<<<//

  //POST to add a new friend to a user's friend list
  //DELETE to remove a friend from a user's friend list
};
