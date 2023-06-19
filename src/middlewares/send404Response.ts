import { ServerResponse } from 'http';

export const send404Response = (res: ServerResponse) => {
	res.writeHead(404, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
};
