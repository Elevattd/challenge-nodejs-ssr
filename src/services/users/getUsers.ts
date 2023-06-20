import { sortUsers } from '../../utils/helpers/users/sortUsers';
import { filterUsers } from '../../utils/helpers/users/filterUsers';
import { URLSearchParams } from 'url';
import { IncomingMessage, ServerResponse } from 'http';

const data = require('../../../data/users.json');

export const getUsers = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
	try {
		const url: URL = new URL(req.url || '', `http://${req.headers.host}`);
		const queryParams: URLSearchParams = new URLSearchParams(url.search);

		const page = queryParams.get('page');
		const limit = queryParams.get('limit');
		const sortBy = queryParams.get('sortBy');
		const sortDirection = queryParams.get('sortDirection');
		const matchParams: { [key: string]: string } = {};

		queryParams.forEach((value: string, key: string) => {
			if (key.startsWith('match[') && key.endsWith(']')) {
				const field = key.substring(6, key.length - 1);
				matchParams[field] = value;
			}
		});

		const pageNumber: number = parseInt(page || '1', 10);
		let limitNumber: number = parseInt(limit || '-1', 10);
		let allUsers = await data;

		if (Object.keys(matchParams).length > 0) {
			allUsers = filterUsers(allUsers, matchParams);
		}

		if (sortBy && sortDirection) {
			allUsers = sortUsers(allUsers, sortBy, sortDirection);
		}

		if (limitNumber === -1) {
			res.writeHead(200, { 'Content-Type': 'application/json' }).end(
				JSON.stringify({ message: 'Usuarios obtenidos con éxito.', data: allUsers }),
			);
		} else {
			const startIndex = (pageNumber - 1) * limitNumber;
			const endIndex = startIndex + limitNumber;
			const paginatedUsers = allUsers.slice(startIndex, endIndex);

			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Usuarios obtenidos con éxito.', data: paginatedUsers }));
		}
	} catch (error: unknown) {
		console.error(error); // Imprime el error en la consola para su posterior análisis
		throw new Error('Hubo un error al listar los usuarios.');
	}
};
