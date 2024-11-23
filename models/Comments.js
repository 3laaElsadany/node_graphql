const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }
})

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;