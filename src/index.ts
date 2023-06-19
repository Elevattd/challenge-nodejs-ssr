import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import { handleRequest } from './routes';
import { apiKeyMiddleware } from './middlewares/apiKeyMiddleware';

dotenv.config();

const { PORT } = process.env;
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
	try {
		apiKeyMiddleware(req, res, () => {
			handleRequest(req, res);
		});
	} catch (error) {
		console.log(error);
	}
});

server.listen(PORT, () => {
	console.log(`SERVER ON PORT --> ${PORT}`);
});
