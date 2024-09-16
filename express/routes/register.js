import { Router } from 'express';
const router = Router();
import newUserHandler from '../controllers/Auth_Controllers/registerController.js';

router.post('/', newUserHandler);

export default router;