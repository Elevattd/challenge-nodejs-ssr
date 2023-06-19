import fs from 'fs';
import path from 'path';
import { IncomingMessage, ServerResponse } from 'http';
import { usersRouter } from './users/index';
import { send404Response } from '../middlewares/send404Response';

const routePath = path.join(__dirname);

export const handleRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
	const { pathname } = new URL(req.url || '', `http://${req.headers.host}`);

	switch (pathname) {
		case '/users':
			return await usersRouter(req, res);
		default:
			return send404Response(res);
	}
};

fs.readdirSync(routePath)
	.filter((file) => file !== 'index.ts')
	.forEach((file) => {
		require(`./${file}`);
		console.log('LOAD ROUTE     -->', file.toUpperCase().split('.')[0]);
	});
