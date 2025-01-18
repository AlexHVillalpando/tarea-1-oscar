import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const encryptAdapter = {
	hash: (password: string) => {
		const salt = genSaltSync(12);
		return hashSync(password, salt);
	},
	compare: (unHashedPassword: string, hashPassword: string) => {
		return compareSync(unHashedPassword, hashPassword);
	},
};
