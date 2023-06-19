import { IncomingMessage, ServerResponse } from 'http';
// const data = require('../../data/users.json');

export const getUsers = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
	try {
		// Logica para obtener todos los usuarios
		res.writeHead(200, { 'Content-Type': 'application/json' }).end(
			JSON.stringify({ message: 'Obtener todos los usuarios', data: require('../../data/users.json') }),
		);
	} catch (error: unknown) {
		throw new Error('Users not found');
	}
};

export const createUserRouter = async (req: IncomingMessage, res: ServerResponse) => {};
