const { ApolloServer } = require('apollo-server');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// TODO : REQUIRE CONNECT TO DB
const books = [
	{
		title: 'The Awakening',
		author: 'Kate Chopin',
	},
	{
		title: 'City of Glass',
		author: 'Paul Auster',
	},
];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
