import { Router } from 'express';
const router = Router();
import { handleAuth } from '../controllers/authController.js';


router.post('/', handleAuth);

export default router;
