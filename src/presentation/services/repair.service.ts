export class RepairService {
	constructor() {}

	async findAllPendings() {
		return {
			message: 'Obtener la lista de motos pendientes (pending) de reparar',
		};
	}

	async findAPending() {
		return {
			message: 'Obtener una moto pendiente de reparar por su id',
		};
	}

	async createADate() {
		return {
			message:
				'Crear una cita, se debe incluir en elreq.body lo siguiente (date, userId) El userId siendo el id del usuario quien solicita la reparación.',
		};
	}

	async completedRepair() {
		return {
			message:
				'Actualizar el status de una reparación ha completado (cambiar status a completed)',
		};
	}

	async cancelledRepair() {
		return {
			message:
				'Cancelar la reparación de un usuario (cambiar status a cancelled)',
		};
	}
}
