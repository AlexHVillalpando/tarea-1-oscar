import { Router } from 'express';
import { RepairController } from './controller';
import { RepairService } from '../services/repair.service';

export class RepairRoutes {
	static get routes(): Router {
		const router = Router();

		const repairService = new RepairService();
		const repairController = new RepairController(repairService);

		router.get('/', repairController.findAllPendings);
		router.get('/:id', repairController.findAPending);
		router.post('/', repairController.createADate);
		router.patch('/:id', repairController.completedRepair);
		router.delete('/:id', repairController.cancelledRepair);

		return router;
	}
}
