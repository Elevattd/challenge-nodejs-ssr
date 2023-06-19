import { IncomingMessage, ServerResponse } from 'http';

export interface IUsersRouteHandler {
	method: string;
	path: string;
	handler: (req: IncomingMessage, res: ServerResponse) => void;
}
