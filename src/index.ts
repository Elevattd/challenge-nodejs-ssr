import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import { handleRequest } from './routes';

dotenv.config();

const { PORT } = process.env;
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
	try {
		handleRequest(req, res);
	} catch (error) {
		console.log(error);
	}
});

server.listen(PORT, () => {
	console.log(`SERVER ON PORT --> ${PORT}`);
});
