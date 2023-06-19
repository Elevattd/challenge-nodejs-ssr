import { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
dotenv.config();

export const apiKeyMiddleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
	const { API_KEY } = process.env;
	const requestApiKey = req.headers['api-key'];

	if (API_KEY && requestApiKey && API_KEY === requestApiKey) {
		next();
	} else {
		res.statusCode = 401;
		res.end('Unauthorized');
	}
};
