const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");

// This defines the GraphQL scheme so we have a simple query with one field called info and this has type String! meaning it can't be null
// We have updated this schema to have a links connected to the info - like a table linking to another table

// Links variable is to store the data in runtime - as previously only in-memory with the info string

// implementation of the GraphQL schema

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Vote,
  User,
  Link
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start(() => console.log("Server is running on http://localhost:4000"));
