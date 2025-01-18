import { regularExp } from '../../../config/regular-exp';

export class UpdateUserDTO {
	constructor(public readonly name: string, public readonly email: string) {}

	static create(object: { [key: string]: any }): [string?, UpdateUserDTO?] {
		const { name, email } = object;
		//Comprobaciones
		if (!name) return ['Name field is empty. Enter a name', undefined]; //no es necesario poner undefined si es undefined
		if (name.length < 2)
			return ['Name is too short. Enter a longer name.', undefined];
		if (name.length > 80)
			return ['Name is too long. Name must not exceed 80 characters'];

		if (!email) return ['Email field is empty. Enter a valid email.'];
		if (!regularExp.email.test(email)) return ['Enter a valid email.'];

		return [undefined, new UpdateUserDTO(name, email)];
	}
}
