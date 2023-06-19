import { sortUsers } from '../../utils/helpers/users/sortUsers';
import { filterUsers } from '../../utils/helpers/users/filterUsers';
import { URLSearchParams } from 'url';
import { IncomingMessage, ServerResponse } from 'http';

const data = require('../../../data/users.json');

export const getUsers = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
	try {
		const url: URL = new URL(req.url || '', `http://${req.headers.host}`);
		const querys: string[] = url.search.split('?');

		const queryParams: URLSearchParams = new URLSearchParams();
		for (const param of querys) {
			const queryParam: URLSearchParams = new URLSearchParams(param);
			queryParam.forEach((value: string, key: string) => {
				queryParams.append(key, value);
			});
		}

		// obtengo los valores de los params de consulta
		const page = queryParams.get('page');
		const limit = queryParams.get('limit');
		const sortBy = queryParams.get('sortBy');
		const sortDirection = queryParams.get('sortDirection');
		const matchParams: { [key: string]: string } = {};

		// obtemgo los params de coincidencia y agregarlos a matchParams
		queryParams.forEach((value: string, key: string) => {
			if (key.startsWith('match[') && key.endsWith(']')) {
				const field = key.substring(6, key.length - 1);
				matchParams[field] = value;
			}
		});

		// logica para obtener todos los usuarios
		const pageNumber: number = parseInt(page || '1', 10);
		let limitNumber: number = parseInt(limit || '-1', 10);

		// ligca para obtener los usuarios
		let allUsers = await data; // Obtener todos los usuarios desde la base de datos

		// aplicar coincidencia si se proporcionaron los parms de coincidencia
		if (Object.keys(matchParams).length > 0) {
			allUsers = filterUsers(allUsers, matchParams);
		}

		// aplicar ordenamiento si se proporcionaron los params de ordenamiento
		if (sortBy && sortDirection) {
			allUsers = sortUsers(allUsers, sortBy, sortDirection);
		}

		// veriicar si se debe devolver todos los usuarios
		if (limitNumber === -1) {
			res.writeHead(200, { 'Content-Type': 'application/json' }).end(
				JSON.stringify({ message: 'Usuarios obtenidos con éxito.', data: allUsers }),
			);
		} else {
			// aplico pagination si se proporcionaron los params de paginación
			const startIndex = (pageNumber - 1) * limitNumber;
			const endIndex = startIndex + limitNumber;
			const paginatedUsers = allUsers.slice(startIndex, endIndex);

			res.writeHead(200, { 'Content-Type': 'application/json' }).end(
				JSON.stringify({ message: 'Usuarios obtenidos con éxito.', data: paginatedUsers }),
			);
		}
	} catch (error: unknown) {
		throw new Error('Hubo un error al listar los usuarios.');
	}
};
