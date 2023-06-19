import { IncomingMessage, ServerResponse } from 'http';
import { URLSearchParams } from 'url';

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
		let limitNumber: number = parseInt(limit || '10', 10);

		// Verificar si no se paso el param page o limit
		if (!page && !limit) {
			limitNumber = -1; // Valor que representa "todos"
		}

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

// Aca crear la funcion para hacer el sort de los usuarios. faltan interfaces
const sortUsers = (users: any[], sortBy: string, sortDirection: string): any[] => {
	// const sortUsers = (users: User[], sortBy: string, sortDirection: string): User[] => {
	return users.sort((a, b) => {
		let propA = a[sortBy];
		let propB = b[sortBy];

		// Convertir las propiedades a cadenas para asegurar una comparacion correcta
		propA = String(propA);
		propB = String(propB);

		let comparison = 0;

		if (propA < propB) {
			comparison = -1;
		} else if (propA > propB) {
			comparison = 1;
		}

		// Invertir el orden si es descendente
		if (sortDirection === 'descending') {
			comparison *= -1;
		}

		return comparison;
	});
};

// Aca voy a crear la funcion para hacer que matchee si se le pasa algun parametro
const filterUsers = (users: any, matchParams: any) => {
	return users.filter((user: any) => {
		// veritiicar si todos los campos de coincidencia se cumplen para el usuario actual
		return Object.entries(matchParams).every(([field, value]) => {
			// Si el campo no existe en el usuario o no coincide con el valor, devolver false
			return user.hasOwnProperty(field) && user[field] === value;
		});
	});
};
