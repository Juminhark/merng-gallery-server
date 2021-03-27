# merng-galleryapp-server

## Important

- [Node.js v15에서 import from 가능?](https://nodejs.org/api/esm.html#esm_import_statements)
  - 안된다

## Stack

- [Apollo Server v2](https://www.apollographql.com/docs/apollo-server/getting-started/)
- [MongoDB](https://www.mongodb.com/cloud/atlas)
  - [mongoose](https://github.com/Automattic/mongoose)

## Apollo Server v2

- 1. Install dependencies

```sh
> yan init -y
> yarn add apollo-server graphql

// create root directory
> type NUL > index.js

// don`t save node_modules
> type > .gitignore

// .gitignore
node_modules
```

- 2. Define your GraphQL schema

```js
// index.js
const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	# This "Book" type defines the queryable fields for every book in our data source.
	type Book {
		title: String
		author: String
	}

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		books: [Book]
	}
`;
```

- 3. Define your data set

```js
// index.js
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
```

- 4. Define a resolver

```js
// index.js
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		books: () => books,
	},
};
```

- 5. Create an instance of ApolloServer

```js
// index.js
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
```

- 6. Start the server

```
> node index.js

🚀 Server ready at http://localhost:4000/
```

- 7. Execute your first query

```
{
  books {
    title
    author
  }
}

```

mongodb+srv://admin:<password>@cluster0.nvtnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
