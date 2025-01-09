export class UsersService {
	constructor() {}

	async getAllUsers() {
		return {
			message: 'Obtener la lista de los usuarios en la base de datos',
		};
	}

	async getAUser() {
		return {
			message: 'Obteniendo un solo usuario dado un id',
		};
	}

	async createAUser() {
		return {
			message:
				'Crear un nuevo usuario, se debe proporcionar por el req.body (name, email, password, role), el role (rol) puede ser cliente o employee.',
		};
	}

	async editUser() {
		return {
			message:
				'Actualizar los datos de un usuario dado un id, solo puede actualizar su name y email.',
		};
	}

	async disabledUser() {
		return {
			message:
				'Deshabilitar la cuenta de un usuario, cambiar status a disabled',
		};
	}
}
