import fs from 'fs';
import path from 'path';
import { IncomingMessage, ServerResponse } from 'http';
import { usersRouter } from './users/index';

const routePath = path.join(__dirname);

export const handleRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
	const { url } = req;

	switch (url) {
		case '/users':
			return await usersRouter(req, res);
		default:
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
