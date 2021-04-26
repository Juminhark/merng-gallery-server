const projectsResolvers = require('./projects');
const usersResolvers = require('./users');
// const commentsResolvers = require('./comments');

module.exports = {
	// Post: {
	// 	likeCount: (parent) => parent.likes.length,
	// 	commentCount: (parent) => parent.comments.length,
	// },
	Query: {
		...projectsResolvers.Query,
		...usersResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...projectsResolvers.Mutation,
		// ...commentsResolvers.Mutation,
	},
	Subscription: {
		...projectsResolvers.Subscription,
	},
};
