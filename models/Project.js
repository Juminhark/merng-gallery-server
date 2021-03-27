const { model, Schema } = require('mongoose');

const projectSchema = new Schema({
	title: { type: String },
	content: { type: String },
	updated: { type: Date, default: Date.now },
	screen: [{ type: String }],
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

module.exports = model('Project', projectSchema);
