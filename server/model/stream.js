const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
	title: { type: String },
	description: { type: String },
	userId: { type: String },
});

const Stream = mongoose.model('Streams', streamSchema);
module.exports = Stream;
