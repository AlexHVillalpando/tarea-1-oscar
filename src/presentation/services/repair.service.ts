import { In } from 'typeorm';
import { protectAccountOwner } from '../../config/validate-owner';
import { Repair, RepairStatus, User } from '../../data';
import { CreateAppointmentDTO, CustomError } from '../../domain';

export class RepairService {
	constructor() {} //public readonly usersService: UsersService

	async findAllPendings() {
		try {
			return await Repair.find({
				where: {
					status: In([RepairStatus.PENDING, RepairStatus.COMPLETED]),
				},
				relations: ['user'], //tiene que ser el nombre de la propiedad tal y como la pusimos en el modelo User.
				select: {
					user: {
						name: true,
						role: true,
						id: true,
					},
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
				status: RepairStatus.PENDING,
			},
			relations: ['user'],
			select: {
				user: {
					name: true,
					role: true,
					id: true,
				},
			},
		});
		if (!findPending) {
			throw CustomError.internalServer('Error fetching data.');
		}
		return findPending;
	}

	async createADate(createDate: CreateAppointmentDTO, user: User) {
		const createAppointment = new Repair();

		createAppointment.date = createDate.date;
		createAppointment.user = user;

		try {
			return await createAppointment.save();
		} catch (error) {
			throw CustomError.internalServer('Error creating appointment.');
		}
	}

	async completedRepair(id: string, sessionUserId: string) {
		const statusCompleted = await this.findAPending(id);
		const isOwner = protectAccountOwner(statusCompleted.user.id, sessionUserId);

		if (!isOwner)
			throw CustomError.unAuthorized('You are not the owner of this content.');

		statusCompleted.status = RepairStatus.COMPLETED;

		try {
			return await statusCompleted.save();
		} catch (error) {
			throw CustomError.internalServer('Error updating appointment.');
		}
	}

	async cancelledRepair(id: string, sessionUserId: string) {
		const deletedRepair = await this.findAPending(id);
		const isOwner = protectAccountOwner(deletedRepair.user.id, sessionUserId);

		if (!isOwner)
			throw CustomError.unAuthorized('You are not the owner of this content.');

		deletedRepair.status = RepairStatus.CANCELLED;

		try {
			return await deletedRepair.save();
		} catch (error) {
			throw CustomError.internalServer('Error cancelling appointment.');
		}
	}
}
