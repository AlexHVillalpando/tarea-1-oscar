import { User } from '../../data';

export class UsersService {
	constructor() {}

	async getAllUsers() {
		try {
			return await User.find({
				where: {
					status: 'available',
				},
			});
		} catch (error) {
			throw new Error('❌ Error obteniendo usuarios.');
		}
	}

	async getAUser(id: string) {
		const getUser = await User.findOne({
			where: {
				id,
				status: 'available',
			},
		});
		if (!getUser) {
			throw new Error('❌ User not found.');
		}
		return getUser;
	}

	async createAUser(createData: any) {
		const createUser = new User();

		createUser.name = createData.name.toLowerCase().trim();
		createUser.email = createData.email;
		createUser.password = createData.password;
		createUser.role = createData.role;

		try {
			return await createUser.save();
		} catch (error) {
			throw new Error('❌ Error creating user.');
		}
	}

	async editUser(id: string, editData: any) {
		const editUser = await this.getAUser(id);
		editUser.name = editData.name.toLowerCase().trim();
		editUser.email = editData.email;

		try {
			return await editUser.save();
		} catch (error) {
			throw new Error('❌ Error updating user.');
		}
	}

	async disabledUser(id: string) {
		const deletedUser = await this.getAUser(id);

		deletedUser.status = 'disabled';

		try {
			deletedUser.save();
		} catch (error) {
			throw new Error('❌ Error deleting user.');
		}
	}
}
