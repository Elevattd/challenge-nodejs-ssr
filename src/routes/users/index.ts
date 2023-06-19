import { IncomingMessage, ServerResponse } from 'http';
import { usersRoutes } from './usersRoutes';

export const usersRouter = async (req: IncomingMessage, res: ServerResponse) => {
	const { method, url } = req;

	const route = usersRoutes.find((route) => route.method === method && route.path === url);

	if (route) {
		route.handler(req, res);
	} else {
		send404Response(res);
	}
};

const send404Response = (res: ServerResponse) => {
	res.writeHead(404, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
};
