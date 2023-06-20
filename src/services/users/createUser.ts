import fs from 'fs';
import path from 'path';
import { IUser } from '../../utils/interfaces/IUser';
import { v4 as uuid } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
	try {
		const body: any = [];
		req.on('data', (chunk) => {
			body.push(chunk);
		});
		req.on('end', () => {
			const rawData: string = Buffer.concat(body).toString();
			const params: Partial<IUser> = JSON.parse(rawData);

			const newUser: any = {
				wallet_id: uuid(),
				created_at: new Date().toISOString(),
				...params,
			};

			const dataFilePath = path.resolve(__dirname, '../../../data/users.json');
			const rawUsersData: string = fs.readFileSync(dataFilePath, 'utf-8');
			const allUsers: IUser[] = JSON.parse(rawUsersData);

			allUsers.push(newUser);

			fs.writeFileSync(dataFilePath, JSON.stringify(allUsers, null, 2), 'utf-8');

			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Usuario creado con éxito.', data: newUser }));
		});
	} catch (error: unknown) {
		throw new Error('Hubo un error al crear el usuario.');
	}
};
