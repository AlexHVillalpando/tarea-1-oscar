import { Router } from 'express';
import { RepairController } from './controller';
import { RepairService } from '../services/repair.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserRole } from '../../data';

export class RepairRoutes {
	static get routes(): Router {
		const router = Router();

		const repairService = new RepairService();
		const repairController = new RepairController(repairService);
		//Ruta protegida
		router.use(AuthMiddleware.protect);
		router.post('/', repairController.createADate);

		//Rutas exclusivas
		router.get(
			'/',
			AuthMiddleware.restrictTo(UserRole.EMPLOYEE),
			repairController.findAllPendings,
		);
		router.get(
			'/:id',
			AuthMiddleware.restrictTo(UserRole.EMPLOYEE),
			repairController.findAPending,
		);
		router.patch(
			'/:id',
			AuthMiddleware.restrictTo(UserRole.EMPLOYEE),
			repairController.completedRepair,
		);
		router.delete(
			'/:id',
			AuthMiddleware.restrictTo(UserRole.EMPLOYEE),
			repairController.cancelledRepair,
		);

		return router;
	}
}
