const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlenght: 1,
      maxlenght: 280,
    },

    createAt: {
      type: Date,
      default: Date.now,
      //Use a getter method to format the timestamp on query
    },

    username: {
      type: String,
      required: true,
    },

    reaction: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return `${this.reaction.length}`;
});
const Thought = model("thought", thoughtSchema);
module.exports = Thought;
