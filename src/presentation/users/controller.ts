import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';

export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	getAllUsers = async (req: Request, res: Response) => {
		this.usersService
			.getAllUsers()
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((error) => {
				return res.status(500).json({
					message: 'Internal Server Error',
					error,
				});
			});
	};

	getAUser = async (req: Request, res: Response) => {
		this.usersService
			.getAUser()
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((error) => {
				return res.status(500).json({
					message: 'Internal Server Error',
					error,
				});
			});
	};

	createAUser = async (req: Request, res: Response) => {
		this.usersService
			.createAUser()
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((error) => {
				return res.status(500).json({
					message: 'Internal Server Error',
					error,
				});
			});
	};

	editUser = async (req: Request, res: Response) => {
		this.usersService
			.editUser()
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((error) => {
				return res.status(500).json({
					message: 'Internal Server Error',
					error,
				});
			});
	};

	disabledUser = async (req: Request, res: Response) => {
		this.usersService
			.disabledUser()
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((error) => {
				return res.status(500).json({
					message: 'Internal Server Error',
					error,
				});
			});
	};
}
