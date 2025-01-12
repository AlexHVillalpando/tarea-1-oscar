// export class UpdateAppointmentDTO {
// 	constructor(public readonly date: string) {}

// 	static create(object: {
// 		[key: string]: any;
// 	}): [string?, UpdateAppointmentDTO?] {
// 		const { id } = object;

// 		//Comprobaciones
// 		if (!id) return ['ID field is empty. Enter ID.', undefined]; //no es necesario poner undefined si es undefined

// 		return [undefined, new UpdateAppointmentDTO(id)];
// 	}
// }
