import { IUser } from '../../interfaces/IUser';

export const sortUsers = (users: IUser[], sortBy: string, sortDirection: string): IUser[] => {
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
