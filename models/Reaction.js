const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Reaction(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => {
        new Types.ObjectId();
      },
    },

    reactionBuddy: {
      type: String,
      required: true,
      maxlenght: 280,
    },

    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //Use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Reaction = model("reaction", reactionSchema);
module.exports = Reaction;
