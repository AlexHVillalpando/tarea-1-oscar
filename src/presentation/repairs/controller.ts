import { Request, Response } from 'express';
import { RepairService } from '../services/repair.service';
import { CreateAppointmentDTO, CustomError } from '../../domain';

export class RepairController {
	constructor(private readonly repairService: RepairService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({
				message: error.message,
			});
		}
		console.log(error);
		return res.status(500).json({ message: 'Ups, something went wrong...😅' });
	};

	findAllPendings = (req: Request, res: Response) => {
		this.repairService
			.findAllPendings()
			.then((data: any) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	findAPending = (req: Request, res: Response) => {
		const { id } = req.params;
		this.repairService
			.findAPending(id)
			.then((data: any) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	createADate = (req: Request, res: Response) => {
		const [error, createAppointmentDto] = CreateAppointmentDTO.create(req.body);
		const userId = req.body.sessionUser;

		if (error) return res.status(422).json({ message: error });

		this.repairService
			.createADate(createAppointmentDto!, userId)
			.then((data: any) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	completedRepair = (req: Request, res: Response) => {
		const { id } = req.params;
		const sessionUserId = req.body.sessionUser.id;
		this.repairService
			.completedRepair(id, sessionUserId)
			.then((data: any) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	cancelledRepair = (req: Request, res: Response) => {
		const { id } = req.params;
		const sessionUserId = req.body.sessionUser.id;
		this.repairService
			.cancelledRepair(id, sessionUserId)
			.then(() => {
				return res
					.status(200)
					.json({ message: 'Appointment deleted succesfully.' });
			})
			.catch((error: unknown) => this.handleError(error, res));
	};
}
