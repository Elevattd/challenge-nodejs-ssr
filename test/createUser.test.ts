import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { createUser } from '../src/services/users/createUser';

jest.mock('fs');

describe('createUser', () => {
	let mockRequest: Partial<IncomingMessage>;
	let mockResponse: Partial<ServerResponse>;

	beforeEach(() => {
		mockRequest = {
			on: jest.fn(),
		};

		mockResponse = {
			writeHead: jest.fn(),
			end: jest.fn(),
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should create a new user', async () => {
		const user = {
			email: 'Sandy.OKon@gmail.com',
			name: 'Jimmy',
			last_name: 'Torp-Vandervort',
			sex_type: 'male',
			dni: 'eeeee7',
			birth_date: '1944-07-30T15:02:05.276Z',
		};

		const rawData = Buffer.from(JSON.stringify(user));

		const onDataCallback = jest.fn((event: string, callback: Function) => {
			if (event === 'data') {
				callback(rawData);
			}
		});

		const onEndCallback = jest.fn((event: string, callback: Function) => {
			if (event === 'end') {
				callback();
			}
		});

		mockRequest.on = jest.fn().mockImplementationOnce(onDataCallback).mockImplementationOnce(onEndCallback);

		(fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify([]));

		const writeFileSyncMock = fs.writeFileSync as jest.Mock;
		writeFileSyncMock.mockImplementationOnce((filePath, data) => {
			const allUsers = JSON.parse(data);
			allUsers.push({ wallet_id: expect.any(String), created_at: expect.any(String), ...user });
		});

		await createUser(mockRequest as IncomingMessage, mockResponse as ServerResponse);

		expect(mockResponse.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
		expect(mockResponse.end).toHaveBeenCalledWith(expect.stringContaining('Usuario creado con éxito.'));
	});
});
