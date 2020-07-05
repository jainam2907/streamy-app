const express = require('express');
const Stream = require('../model/stream');

const Router = express.Router();

Router.post('/streams', async (req, res) => {
	const stream = new Stream(req.body);
	try {
		await stream.save();
		let response = {};
		response = Object.assign(response, stream._doc);
		response.id = response._id.toString();
		res.status(201).send(response);
	} catch (error) {
		res.status(400).send();
	}
});

Router.get('/streams', async (req, res) => {
	try {
		const streams = await Stream.find({});
		let responses = [];
		streams.map((stream) => {
			let response = {};
			response = Object.assign(response, stream._doc);
			response.id = response._id.toString();
			responses.push(response);
		});
		res.send(responses);
	} catch (error) {
		res.status(500).send();
	}
});

Router.get('/streams/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const stream = await Stream.findById(_id);

		if (!stream) {
			return res.status(400).send();
		}

		let response = {};
		response = Object.assign(response, stream._doc);
		response.id = response._id.toString();
		res.send(response);
	} catch (error) {
		res.status(500).send();
	}
});

Router.patch('/streams/:id', async (req, res) => {
	try {
		const stream = await Stream.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!stream) {
			return res.status(404).send();
		}
		let response = {};
		response = Object.assign(response, stream._doc);
		response.id = response._id.toString();
		res.send(response);
	} catch (error) {
		res.status(400).send();
	}
});

Router.delete('/streams/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const stream = await Stream.findByIdAndDelete(_id);
		if (!stream) {
			return res.status(404).send();
		}
		res.send();
	} catch (error) {
		res.status(500).send();
	}
});

module.exports = Router;
