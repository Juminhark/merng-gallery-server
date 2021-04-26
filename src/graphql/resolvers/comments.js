const { UserInputError, AuthenticationError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Project = require('../../db/models/Project');

module.exports = {
	Mutation: {
		createComment: async (_, { projectId, body }, context) => {
			const { username } = checkAuth(context);
			if (body.trim() === '') {
				throw new UserInputError('Empty comment', {
					errors: {
						body: 'Comment body must be empty',
					},
				});
			}

			const project = await Project.findById(projectId);

			if (project) {
				project.comments.unshift({
					body,
					username,
					createdAt: new Date().toISOString(),
				});
				await project.save();
				return project;
			} else throw new UserInputError('Project not found');
		},
		async deleteComment(_, { projectId, commentId }, context) {
			const { username } = checkAuth(context);

			const project = await Project.findById(projectId);

			if (project) {
				const commentIndex = project.comments.findIndex(
					(c) => c.id === commentId
				);

				if (project.comments[commentIndex].username === username) {
					project.comments.splice(commentIndex, 1);
					await project.save();
					return project;
				} else {
					throw new AuthenticationError('Action now allowed');
				}
			} else {
				throw new UserInputError('Project not found');
			}
		},
	},
};
