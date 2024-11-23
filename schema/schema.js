const {
  buildSchema
} = require('graphql');

const schema = buildSchema(`
  type Post {
    title: String!,
    content: String!,
    user: User,
    comments: [Comment!]
  }
  type User {
    name: String!,
    email: String!,
    userPosts: [Post]
  }
  type Comment {
    content: String!,
    user: User!,
    post: Post!
  }
  type Query {
    getUsers: [User!]!,
    getUser(id: String!): User!,
    getPosts(token: String!): [Post!]!,
    getPost(id: String!): Post!,
    getComments: [Comment!]!,
    getComment(id: String!): Comment!
  }
  input userInput {
    name: String!,
    email: String!,
    password: String!
  }
  type Mutation {
    createUser(inputRegister: userInput): User,
    userLogin(email:String!,password:String!): String,
    createPost(title: String!,content: String!,token: String!): Post!,
    updatePost(id: String!,title: String!,content: String!): Post!,
    deletePost(id: String!): String,
    createComment(content: String!,userId: String!,postId: String!): Comment!,
    updateComment(id: String!,content: String!): Comment!
    deleteComment(id: String!): String
  }
`)

module.exports = schema;