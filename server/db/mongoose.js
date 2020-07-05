const mongoose = require('mongoose');
const { DB_URI } = require('../config');

mongoose
	.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Database connection Successful!');
	})
	.catch(() => {
		console.log('Error while connection database');
	});
