import { createUser } from '../../services/users/createUser';
import { getUsers } from '../../services/users/getUsers';
import { IUsersRouteHandler } from '../../utils/interfaces/IUsersRouteHandler.interface';

export const usersRoutes: IUsersRouteHandler[] = [
	{
		method: 'GET',
		path: '/users',
		handler: getUsers,
	},
	{
		method: 'POST',
		path: '/users',
		handler: createUser,
	},
];
