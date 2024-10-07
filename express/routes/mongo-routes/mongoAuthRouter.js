import mongoAuthController from '../../controllers/mongo_controllers/mongoAuthController.js';
import { Router } from 'express';
const router = Router();


router.post('/', mongoAuthController.handleAuth);

export default router;
