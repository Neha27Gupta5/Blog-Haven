const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  comments: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  postId: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
