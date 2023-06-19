import { createUserRouter, getUsers } from '../../services/users';
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
		handler: createUserRouter,
	},
];
