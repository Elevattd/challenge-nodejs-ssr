// const http = require('http')
// const users = require('./../data/users.json');

import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;
const server = http.createServer((req, res) => {
	try {
	} catch (error) {
		console.log(error);
	}
});

server.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
