import { IncomingMessage, ServerResponse } from 'http';

export const usersRouter = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
	if (req.method === 'GET') {
		// Logica para obtener todos los usuarios
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Obtener todos los usuarios' }));
	} else {
		// Logica para otros métodos HTTP en /users
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
	}
};
