import { Request, Response } from 'express';
import { RepairService } from '../services/repair.service';

export class RepairController {
	constructor(private readonly repairService: RepairService) {}

	findAllPendings = async (req: Request, res: Response) => {
		this.repairService
			.findAllPendings()
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

	findAPending = async (req: Request, res: Response) => {
		this.repairService
			.findAPending()
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

	createADate = async (req: Request, res: Response) => {
		this.repairService
			.createADate()
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

	completedRepair = async (req: Request, res: Response) => {
		this.repairService
			.completedRepair()
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

	cancelledRepair = async (req: Request, res: Response) => {
		this.repairService
			.cancelledRepair()
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
