import { Repair } from '../../data';

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
			throw new Error('❌ Error fetching repairs.');
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
			throw new Error('❌ Repair not found.');
		}
		return findPending;
	}

	async createADate(createDate: any) {
		const createAppointment = new Repair();

		createAppointment.date = createDate.date;

		try {
			return await createAppointment.save();
		} catch (error) {
			throw new Error('❌ Error creating appointment.');
		}
	}

	async completedRepair(id: string) {
		const statusCompleted = await this.findAPending(id);

		statusCompleted.status = 'completed';

		try {
			return await statusCompleted.save();
		} catch (error) {
			throw new Error('❌ Error updating status.');
		}
	}

	async cancelledRepair(id: string) {
		const deletedRepair = await this.findAPending(id);

		deletedRepair.status = 'cancelled';

		try {
			return await deletedRepair.save();
		} catch (error) {
			throw new Error('❌ Error deleting repair.');
		}
	}
}
