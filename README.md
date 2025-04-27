
# GraphQL UI

A simple Express.js and GraphQL project that showcases how to build a GraphQL API with an interactive UI.

## Features

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **GraphQL**: Query language and runtime for APIs.
- **express-graphql**: Middleware for connecting GraphQL with Express.
- **Interactive GraphiQL**: Explore and test your GraphQL queries and mutations.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/3laaElsadany/node_graphql.git
   ```

2. Navigate to the project directory:

   ```bash
   cd node_graphql
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your configuration:

   ```env
   PORT=3000
   ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Access the application:

   Open your browser and navigate to `http://localhost:3000/graphql` to interact with the GraphiQL interface.

## Project Structure

```
graphql_ui/
│
├── resolver/            # Resolvers for handling GraphQL queries and mutations
│   ├── resolver.js      # Main resolver logic
│
├── schema/              # GraphQL schema definitions
│   ├── schema.js        # Main GraphQL schema
│
├── connection.js        # Database connection setup
│
├── .env                 # Environment variables
├── server.js            # Main server file
├── package.json         # Project configuration and dependencies
└── README.md            # Project documentation
```

## Scripts

- **Start Server**: `npm start`
- **Development Mode**: Use `nodemon` for hot-reloading.

## Technologies Used

- Node.js
- Express.js
- GraphQL
- dotenv
- express-graphql

