import { Repair } from '../../data';
import { CreateAppointmentDTO, CustomError } from '../../domain';

export class RepairService {
	constructor() {}

	async findAllPendings() {
		try {
			return await Repair.find({
				where: {
					status: 'pending',
				},
			});
		} catch (error) {
			throw CustomError.internalServer('Error fetching data.');
		}
	}

	async findAPending(id: string) {
		const findPending = await Repair.findOne({
			where: {
				id,
				status: 'pending',
			},
		});
		if (!findPending) {
			throw CustomError.internalServer('Error fetching data.');
		}
		return findPending;
	}

	async createADate(createDate: CreateAppointmentDTO) {
		const createAppointment = new Repair();

		createAppointment.date = createDate.date;

		try {
			return await createAppointment.save();
		} catch (error) {
			throw CustomError.internalServer('Error creating appointment.');
		}
	}

	async completedRepair(id: string) {
		const statusCompleted = await this.findAPending(id);

		statusCompleted.status = 'completed';

		try {
			return await statusCompleted.save();
		} catch (error) {
			throw CustomError.internalServer('Error updating appointment.');
		}
	}

	async cancelledRepair(id: string) {
		const deletedRepair = await this.findAPending(id);

		deletedRepair.status = 'cancelled';

		try {
			return await deletedRepair.save();
		} catch (error) {
			throw CustomError.internalServer('Error cancelling appointment.');
		}
	}
}
