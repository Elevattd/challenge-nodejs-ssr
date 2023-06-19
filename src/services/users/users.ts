import { IncomingMessage, ServerResponse } from 'http';
import { URLSearchParams } from 'url';

const data = require('../../data/users.json');

export const getUsers = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
	try {
		const url = new URL(req.url || '', `http://${req.headers.host}`);
		const queryParams = new URLSearchParams(url.search);
		console.log('🚀 👍 ~ getUsers ~ queryParams:', queryParams);
		console.log('🚀 👍 ~ getUsers ~ url:', url);

		// Obtengo los valores de los parámetros de consulta
		const page = queryParams.get('page');
		const limit = queryParams.get('limit');

		// Logica para obtener todos los usuarios
		const pageNumber = parseInt(page || '1', 10);
		let limitNumber = parseInt(limit || '10', 10);

		// Verificar si no se proporcionó el parámetro page o limit
		if (!page && !limit) {
			limitNumber = -1; // Valor que representa "todos"
		}

		// Calcular el índice de inicio y fin para la paginación
		const startIndex = (pageNumber - 1) * limitNumber;
		const endIndex = startIndex + limitNumber;

		// Lógica para obtener los usuarios y aplicar la paginación
		const allUsers = await data; // Obtener todos los usuarios desde la base de datos

		// Verificar si se debe devolver todos los usuarios
		const paginatedUsers = limitNumber === -1 ? allUsers : allUsers.slice(startIndex, endIndex);

		res.writeHead(200, { 'Content-Type': 'application/json' }).end(
			JSON.stringify({ message: 'Usuarios obtenidos con éxito.', data: paginatedUsers }),
		);
	} catch (error: unknown) {
		throw new Error('Hubo un error al listar los usuarios.');
	}
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {};
