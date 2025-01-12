import { User } from '../../data';
import { CreateUserDTO, CustomError, UpdateUserDTO } from '../../domain';

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
			throw CustomError.internalServer('Error fetching users.');
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
			throw CustomError.internalServer('User not found.');
		}
		return getUser;
	}

	async createAUser(createData: CreateUserDTO) {
		const createUser = new User();

		createUser.name = createData.name.toLowerCase().trim();
		createUser.email = createData.email;
		createUser.password = createData.password;
		createUser.role = createData.role;

		try {
			return await createUser.save();
		} catch (error) {
			throw CustomError.internalServer('Error registering user.');
		}
	}

	async editUser(id: string, editData: UpdateUserDTO) {
		const editUser = await this.getAUser(id);
		editUser.name = editData.name.toLowerCase().trim();
		editUser.email = editData.email;

		try {
			return await editUser.save();
		} catch (error) {
			throw CustomError.internalServer('Error updating user data.');
		}
	}

	async disabledUser(id: string) {
		const deletedUser = await this.getAUser(id);

		deletedUser.status = 'disabled';

		try {
			deletedUser.save();
		} catch (error) {
			throw CustomError.internalServer('Error registering user.');
		}
	}
}
