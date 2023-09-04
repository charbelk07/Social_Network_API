const { Reaction, Thought, User } = require("../models");

// module.exports = {
//   // Get all courses
//   async getUsers(req, res) {
//     try {
//       const users = await User.find();
//       res.json(courses);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//////////

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find().select("__v");
      res.json(users);
    } catch (err) {
      console.log(err);
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
  async deleteUserById(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
      }

      const thought = await Thought.findOneAndUpdate(
        { user: req.params.thoughtId },
        { $pull: { user: req.params.thoughtId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "User deleted, but no thought found",
        });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //       await User.deleteMany({ _id: { $in: user.students } });
  //       res.json({ message: "Course and students deleted!" });
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   },
  //>>>>/api/users/:userId/friends/:friendId<<<<//

  //POST to add a new friend to a user's friend list

  async addFriend(req, res) {
    console.log("You are adding a Friend");
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //DELETE to remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendsId: req.params.friendsId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
