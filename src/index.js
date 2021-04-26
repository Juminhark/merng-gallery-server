// APOLLO-SERVER
const { ApolloServer, PubSub } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
// MONGODB
const { startDB } = require('./db');
// DOTENV
const dotenv = require('dotenv');
dotenv.config();

// DB Connect //
const db = startDB({
	connectURL: process.env.DB_URL,
});

const pubsub = new PubSub();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubsub, db }),
});

// The `listen` method launches a web server.
server.listen({ port: 4000 }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
