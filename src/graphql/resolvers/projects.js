const { AuthenticationError, UserInputError } = require('apollo-server');

const Project = require('../../db/models/Project');
const checkAuth = require('../../util/check-auth');

module.exports = {
	Query: {
		getProjects: async () => {
			try {
				// sort() => Project list 순서 교정
				const projects = await Project.find()
					.sort({ createdAt: -1 })
					.populate('owner');
				return projects;
			} catch (err) {
				throw new Error(err);
			}
		},
		getProject: async (_, { projectId }) => {
			try {
				const project = await Project.findById(projectId).populate('owner');
				if (project) {
					return project;
				} else {
					throw new Error('Project not found');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createProject: async (_, { title, content }, context) => {
			const user = checkAuth(context);

			// 교차검증
			const owner = await User.findOne({ email: user.email });
			if (title.trim() === '') {
				throw new Error('Project title must not be empty');
			}
			if (content.trim() === '') {
				throw new Error('Project content must not be empty');
			}

			const newProject = new Project({
				title,
				content,
				owner,
				updated: new Date().toISOString(),
			});

			const project = await newProject.save();

			// context.pubsub.publish('NEW_Project', {
			// 	newProject: project,
			// });

			return project;
		},

		deleteProject: async (_, { projectId }) => {
			try {
				console.log(projectId);
				await Project.deleteOne({ _id: projectId });
				return 'Project deleted successfully';
			} catch (err) {
				throw new Error(err);
			}
		},
		likeProject: async (_, { projectId }, context) => {
			const { username } = checkAuth(context);

			const project = await Project.findById(projectId);
			if (project) {
				if (project.likes.find((like) => like.username === username)) {
					// Project already likes, unlike it
					project.likes = project.likes.filter(
						(like) => like.username !== username
					);
					await project.save();
				} else {
					// Not liked, like project
					project.likes.push({
						username,
						createdAt: new Date().toISOString(),
					});
				}

				await project.save();
				return project;
			} else throw new UserInputError('Project not found');
		},
	},

	Subscription: {
		newProject: {
			subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_PROJECT'),
		},
	},
};
