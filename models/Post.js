const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
})


const Post = mongoose.model("Post", postSchema);
module.exports = Post;