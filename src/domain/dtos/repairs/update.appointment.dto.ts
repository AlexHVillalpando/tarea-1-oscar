export class UpdateAppointmentDTO {
	constructor(public readonly status: string) {}

	static updateRepair(object: {
		[key: string]: any;
	}): [string?, UpdateAppointmentDTO?] {
		const { status } = object;

		//Comprobaciones
		if (!status) return ['Status field is empty.', undefined]; //no es necesario poner undefined si es undefined

		return [undefined, new UpdateAppointmentDTO(status)];
	}
}
