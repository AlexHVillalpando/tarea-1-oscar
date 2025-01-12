export class CreateAppointmentDTO {
	constructor(public readonly date: Date) {}

	static create(object: {
		[key: string]: any;
	}): [string?, CreateAppointmentDTO?] {
		const { date } = object;
		const currentDate = new Date();

		const appointmentDate = new Date(date);

		//Comprobaciones
		if (!date) return ['Date field is empty. Enter a date', undefined]; //no es necesario poner undefined si es undefined
		if (appointmentDate.getTime() < currentDate.getTime())
			return [
				'Appointment date must not on the same date or before the current date.',
			];

		return [undefined, new CreateAppointmentDTO(date)];
	}
}
