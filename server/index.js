require('./db/mongoose');
const express = require('express');
var cors = require('cors');
const streamRouter = require('./route/stream');

const app = express();
app.use(cors());
app.use(express.json());

app.use(streamRouter);

app.listen(3001, () => {
	console.log('Server is up & running at port 3001');
});
