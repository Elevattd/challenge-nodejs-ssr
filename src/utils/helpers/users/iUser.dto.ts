import { IUser } from '../../interfaces/IUser';

export const isIUser = (obj: any, requiredProps: (keyof IUser)[]): obj is IUser => {
	return requiredProps.every((prop) => prop in obj);
};
