import { usersRoutes } from './users.routes';
import { send404Response } from '../../middlewares/send404Response';
import { IncomingMessage, ServerResponse } from 'http';

export const usersRouter = async (req: IncomingMessage, res: ServerResponse) => {
	const { method, url } = req;
	const { pathname } = new URL(url || '', `http://${req.headers.host}`);

	const route = usersRoutes.find((route) => route.method === method && route.path === pathname);

	if (route) {
		route.handler(req, res);
	} else {
		send404Response(res);
	}
};
