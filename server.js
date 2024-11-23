const express = require('express');
const app = express();
require('dotenv').config();
const {
  graphqlHTTP
} = require('express-graphql');
require('./connection');

port = process.env.PORT;

const schema = require('./schema/schema');

const {
  commentMutation,
  commentQueries,
  postMutation,
  postQueries,
  userMutation,
  userQueries
} = require('./resolver/resolver')


const resolvers = {
  ...userQueries,
  ...userMutation,
  ...postMutation,
  ...postQueries,
  ...commentMutation,
  ...commentQueries
}

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});