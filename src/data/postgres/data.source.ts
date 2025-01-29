import { envs } from '../../config';

interface Options {
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
}

const options: Options = {
	host: envs.DB_HOST,
	port: envs.DB_PORT,
	username: envs.DB_USERNAME,
	password: envs.DB_PASSWORD,
	database: envs.DB_DATABASE,
};
