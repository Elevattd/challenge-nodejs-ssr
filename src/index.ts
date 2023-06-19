import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { handleRequest } from './routes';
import { apiKeyMiddleware } from './middlewares/apiKeyMiddleware';
import { barerTokenMiddleware } from './middlewares/barerTokenMiddleware';

dotenv.config();

const { PORT } = process.env;

const corsOptions = {
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
	try {
		cors(corsOptions);
		barerTokenMiddleware(req, res, () => {
			apiKeyMiddleware(req, res, () => {
				handleRequest(req, res);
			});
		});
	} catch (error) {
		console.log(error);
	}
});

server.listen(PORT, () => {
	console.log(`SERVER ON PORT --> ${PORT}`);
});
