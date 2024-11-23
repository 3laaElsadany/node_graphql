const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const Comment = require('../models/Comments');

const secret = process.env.SECRET;

const auth = async (token) => {
  const {
    userId
  } = jwt.verify(token, secret);
  const user = await User.findById(userId);
  return user;
}

const commentMutation = {
  createComment: async ({
    content,
    userId,
    postId
  }) => {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    if (!user || !post) {
      throw new Error('User or post not found');
    } else {
      const comment = new Comment({
        content,
        userId,
        postId
      });
      await comment.save();
      const populateComment = await Comment.findById(comment._id).populate('userId postId');
      const result = {
        content: populateComment.content,
        user: {
          name: populateComment.userId.name,
          email: populateComment.userId.email
        },
        post: {
          title: populateComment.postId.title,
          content: populateComment.postId.content
        }
      }
      return result;
    }
  },
  updateComment: async ({
    id,
    content
  }) => {
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new Error('Comment not found');
    } else {
      const updatedComment = await Comment.findByIdAndUpdate(id, {
        content
      }, {
        new: true
      }).populate('userId postId');
      const result = {
        content: updatedComment.content,
        user: {
          name: updatedComment.userId.name,
          email: updatedComment.userId.email
        },
        post: {
          title: updatedComment.postId.title,
          content: updatedComment.postId.content
        }
      }
      return result;
    }
  },
  deleteComment: async ({
    id
  }) => {
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new Error('Comment not found');
    } else {
      await Comment.findByIdAndDelete(id);
      return 'Comment deleted successfuly';
    }
  }
}


const commentQueries = {
  getComments: async () => {
    const comments = await Comment.find().populate('userId postId');
    return comments.map(comment => {
      return {
        content: comment.content,
        user: {
          name: comment.userId.name,
          email: comment.userId.email
        },
        post: {
          title: comment.postId.title,
          content: comment.postId.content
        }
      }
    });
  },
  getComment: async ({
    id
  }) => {
    const comment = await Comment.findById(id).populate('userId postId');
    if (!comment) {
      throw new Error('Comment not found');
    } else {
      const result = {
        content: comment.content,
        user: {
          name: comment.userId.name,
          email: comment.userId.email
        },
        post: {
          title: comment.postId.title,
          content: comment.postId.content
        }
      }
      return result;
    }
  }
}

const userQueries = {
  getUsers: async () => {
    const users = await User.find();
    return users;
  },
  getUser: async ({
    id
  }) => {
    const user = await User.findById(id).populate('userPosts');
    return user;
  }
};

const postQueries = {
  getPosts: async ({
    token
  }) => {
    const user = await auth(token);
    const posts = await Post.find({
      userId: user.id
    }).populate('userId');

    return posts.map(post => ({
      title: post.title,
      content: post.content,
      user: post.userId
    }));
  },
  getPost: async ({
    id
  }) => {
    const post = await Post.findById(id).populate('userId');
    if (!post) {
      throw new Error('Post not found');
    } else {

      const comments = await Comment.find({
        postId: id
      }).populate('userId');

      const result = {
        title: post.title,
        content: post.content,
        user: {
          name: post.userId.name,
          email: post.userId.email
        },
        comments: comments.map(comment => ({
          content: comment.content,
          user: {
            name: comment.userId.name,
            email: comment.userId.email
          }
        }))
      }

      return result;
    }
  }
}

const userMutation = {
  createUser: async ({
    inputRegister
  }) => {
    const {
      name,
      email,
      password
    } = inputRegister;
    const hashPassword = bcrypt.hashSync(password, 12);
    const userCreated = new User({
      name,
      email,
      password: hashPassword
    })
    await userCreated.save();
    return {
      name,
      email
    };
  },
  userLogin: async ({
    email,
    password
  }) => {
    const user = await User.findOne({
      email
    })

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid || !user) {
      throw new Error('Invalid email or password')
    } else {
      const token = jwt.sign({
        userId: user.id
      }, secret)
      return `Token: ${token}`
    }
  },
}

const postMutation = {
  createPost: async ({
    title,
    content,
    token
  }) => {
    const user = await auth(token);
    if (!user) {
      throw new Error('Invalid token')
    } else {
      const post = new Post({
        title,
        content,
        userId: user._id
      })
      await post.save();
      const createdPost = await Post.findById(post._id).populate('userId');
      const result = {
        title: createdPost.title,
        content: createdPost.content,
        user: {
          name: createdPost.userId.name,
          email: createdPost.userId.email
        }
      }
      return result;
    }
  },
  updatePost: async ({
    id,
    title,
    content
  }) => {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error('Post not found')
    } else {
      const updatedPost = await Post.findByIdAndUpdate(id, {
        title,
        content
      }, {
        new: true
      }).populate('userId');
      const result = {
        title: updatedPost.title,
        content: updatedPost.content,
        user: {
          name: updatedPost.userId.name,
          email: updatedPost.userId.email
        }
      }
      return result;
    }

  },
  deletePost: async ({
    id
  }) => {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error('Post not found')
    } else {
      await Post.deleteOne({
        _id: id
      });
      return 'Post deleted successfuly';
    }
  }
}

module.exports = {
  commentMutation,
  commentQueries,
  userQueries,
  postQueries,
  userMutation,
  postMutation
}