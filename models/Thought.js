const { Schema, model } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema({
  reactionId: { type: Schema.Types.ObjectId, default: new ObjectId() },
  reactionBody: {
    type: Schema.Types.String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: Schema.Types.String,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});
// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: Schema.Types.String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Schema.Types.Date,
      default: Date.now,
    },

    username: {
      type: Schema.Types.String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });
thoughtSchema.methods.getFormattedDate = function () {
  return moment(this.createdAt).format("MM-DD-YYYY");
};
reactionSchema.methods.getFormattedDate = function () {
  return moment(this.createdAt).format("MM-DD-YYYY");
};

// Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
