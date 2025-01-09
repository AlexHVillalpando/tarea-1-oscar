import { Router } from 'express';
import { RepairRoutes } from './repairs/router';
import { UsersRoutes } from './users/router';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/api/v1/users', UsersRoutes.routes);
		router.use('/api/v1/repairs', RepairRoutes.routes);

		return router;
	}
}
