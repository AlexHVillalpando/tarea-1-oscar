import { regularExp } from '../../../config/regular-exp';

export class LoginUserDTO {
	constructor(
		public readonly email: string,
		public readonly password: string,
	) {}

	static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
		const { email, password } = object;

		if (!email) return ['Email field empty.'];
		if (!regularExp.email.test(email)) return ['Invalid email.'];
		if (!password) return ['Password field empty.'];
		if (!regularExp.password.test(password))
			return [
				'Invalid password, must be at least 6 characters long and contain at least one uppercase letter, one lowercasa letter, and one special character',
			];
		return [undefined, new LoginUserDTO(email, password)];
	}
}
