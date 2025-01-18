import jwt from 'jsonwebtoken';

import { envs } from './env';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
	static async generateToken(payload: any, duration: string = '3h') {
		return new Promise((resolve) => {
			jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
				if (err) return resolve(null);
				resolve(token);
			});
		});
	}
}
