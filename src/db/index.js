const mongoose = require('mongoose');

// Set up Mongoose Promises.
mongoose.Promise = global.Promise;

module.exports.startDB = ({ connectURL }) =>
	mongoose.connect(`${connectURL}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});
