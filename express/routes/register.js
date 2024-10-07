import { Router } from 'express';
const router = Router();
import newUserHandler from '../controllers/mongo_controllers/mongoRegisterController.js';

router.post('/', newUserHandler);

export default router;