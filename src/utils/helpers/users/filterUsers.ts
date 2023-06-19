import { IUser } from '../../interfaces/IUser';

export const filterUsers = (users: IUser[], matchParams: any) => {
	return users.filter((user: IUser) => {
		// veritiicar si todos los campos de coincidencia se cumplen para el usuario actual
		return Object.entries(matchParams).every(([field, value]) => {
			// Si el campo no existe en el usuario o no coincide con el valor, devolver false
			return user.hasOwnProperty(field) && user[field] === value;
		});
	});
};
