const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Post", PostSchema);
