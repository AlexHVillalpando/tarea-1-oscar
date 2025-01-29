import { encryptAdapter } from '../../config/bcrypt.adapter';
import { JwtAdapter } from '../../config/jwt.adapter';
import { User, UserStatus } from '../../data';
import { CreateUserDTO, CustomError, UpdateUserDTO } from '../../domain';
import { LoginUserDTO } from '../../domain/dtos/users/login.user.dto';
import { RegisterDTO } from '../../domain/dtos/users/register.user.dto';

export class UsersService {
	constructor() {}

	async getAllUsers() {
		try {
			return await User.find({
				where: {
					status: UserStatus.AVAILABLE,
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
				status: UserStatus.AVAILABLE,
			},
		});
		if (!getUser) {
			throw CustomError.notFound('User not found.');
		}
		return getUser;
	}

	async getUserbyEmail(email: string) {
		const user = await User.findOne({
			where: {
				email: email,
				status: UserStatus.AVAILABLE,
			},
		});
		if (!user)
			throw CustomError.notFound(
				`User with email: ${email} could not be found.`,
			);
		return user;
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

		deletedUser.status = UserStatus.DISABLED;

		try {
			deletedUser.save();
			return { ok: true };
		} catch (error) {
			throw CustomError.internalServer('Error disabling user.');
		}
	}

	async register(userData: RegisterDTO) {
		const user = new User();

		user.name = userData.name.toLowerCase().trim();
		user.email = userData.email;
		user.password = userData.password;
		user.role = userData.role;

		try {
			const dbUser = await user.save();
			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				role: dbUser.role,
			};
		} catch (error: any) {
			if (error.code === '23505') {
				throw CustomError.badRequest(
					`User with email: ${userData.email} already exists.`,
				);
			}
			throw CustomError.internalServer('Error while creating user.');
		}
	}

	async login(credentials: LoginUserDTO) {
		const user = await this.getUserbyEmail(credentials.email);
		const isMatching = encryptAdapter.compare(
			credentials.password,
			user.password,
		);

		if (!isMatching) throw CustomError.unAuthorized('Invalid credentials.');

		const token = await JwtAdapter.generateToken({ id: user.id });
		if (!token)
			throw CustomError.internalServer('Error while generating Token.');
		return {
			token: token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		};
	}
}
