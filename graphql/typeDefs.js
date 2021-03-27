const { gql } = require('apollo-server');

const typeDefs = gql`
	type User {
		id: ID!
		email: String!
		username: String!
		token: String!
		picture_url: String
		social: [String]
		projects: [Project]
	}

	type Project {
		id: ID!
		title: String!
		content: String!
		updated: String!
		screen: [String]
		owner: User!
	}

	input RegisterInput {
		username: String!
		email: String!
		password: String!
		confirmPassword: String!
	}

	type Query {
		allUser: [User]
		getProjects: [Project]
		getProject(projectId: ID!): Project
		oauthLoginUrl: [String]
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		login(email: String!, password: String!): User!
		authorizeWithGithub(code: String!): User!
		authorizeWithGoogle(code: String!): User!
		createProject(title: String!, content: String): Project!
		deleteProject(projectId: ID!): String
	}

	type Subscription {
		newProject: Project!
	}
`;

export default typeDefs;
