import { Guid } from 'guid-typescript';

export interface IUser {
	wallet_id: Guid;
	email: string;
	name: string;
	last_name: string;
	sex_type: string;
	dni: number;
	birth_date: string;
	create_at: string;
	[key: string]: string | number | boolean | Guid;
}
