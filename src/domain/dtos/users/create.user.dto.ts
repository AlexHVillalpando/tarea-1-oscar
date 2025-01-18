import { regularExp } from '../../../config/regular-exp';
import { UserRole } from '../../../data';

export class CreateUserDTO {
	constructor(
		public readonly name: string,
		public readonly email: string,
		public readonly password: string,
		public readonly role: UserRole,
	) {}

	static create(object: { [key: string]: any }): [string?, CreateUserDTO?] {
		const { name, email, password, role } = object;
		//Comprobaciones
		if (!name) return ['Name field is empty. Enter a name', undefined]; //no es necesario poner undefined si es undefined
		if (name.length < 2)
			return ['Name is too short. Enter a longer name.', undefined];
		if (name.length > 80)
			return ['Name is too long. Name must not exceed 80 characters'];

		if (!email) return ['Email field is empty.'];
		if (email.length <= 5) return ['Email is too short. Enter a valid email.'];
		if (!regularExp.email.test(email)) return ['Invalid email.'];

		if (!password) return ['Password field is empty.'];
		if (!regularExp.password.test(password))
			return [
				'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase, and one special character.',
			];

		return [undefined, new CreateUserDTO(name, email, password, role)];
	}
}
