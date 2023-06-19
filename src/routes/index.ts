import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

const routePath = path.join(__dirname);

export const handleRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
	const { url, method } = req;

	if (url === '/users' && method === 'GET') {
		const usersRouter = require('./users').default;
		usersRouter(req, res);
	} else if (url === '/users' && method === 'POST') {
		const createUserRouter = require('./createUser').default;
		createUserRouter(req, res);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
	}
};

fs.readdirSync(routePath)
	.filter((file) => file !== 'index.ts')
	.forEach((file) => {
		require(`./${file}`);
		console.log('LOAD ROUTE   -->', file.toUpperCase().split('.')[0]);
	});
