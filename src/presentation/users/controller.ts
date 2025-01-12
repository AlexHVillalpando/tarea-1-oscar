import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { CreateUserDTO, CustomError, UpdateUserDTO } from '../../domain';

export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message });
		}
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong...😅' });
	};

	getAllUsers = (req: Request, res: Response) => {
		this.usersService
			.getAllUsers()
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	getAUser = (req: Request, res: Response) => {
		const { id } = req.params;
		this.usersService
			.getAUser(id)
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	createAUser = (req: Request, res: Response) => {
		const [error, CreateUserDto] = CreateUserDTO.create(req.body);
		if (error) return res.status(422).json({ message: error });

		this.usersService
			.createAUser(CreateUserDto!)
			.then((data: any) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	editUser = (req: Request, res: Response) => {
		const { id } = req.params;
		const [error, updateUserDto] = UpdateUserDTO.create(req.body);

		if (error) return res.status(422).json({ message: error });

		this.usersService
			.editUser(id, updateUserDto!)
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	disabledUser = (req: Request, res: Response) => {
		const { id } = req.params;
		this.usersService
			.disabledUser(id)
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};
}
