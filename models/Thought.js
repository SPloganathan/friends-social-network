const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
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
      get: getReactionFormattedDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
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
      get: getThoughtsFormattedDate,
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
      getters: true,
    },
    id: false,
  }
);
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });
function getThoughtsFormattedDate(createdAt) {
  return moment(createdAt).format("MM-DD-YYYY HH:MM a");
}
function getReactionFormattedDate(createdAt) {
  return moment(createdAt).format("MM-DD-YYYY HH:MM a");
}

// Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
