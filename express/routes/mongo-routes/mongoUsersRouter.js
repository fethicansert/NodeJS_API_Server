import mongoUsersController from '../../controllers/mongo_controllers/mongoUsersController.js';
import { Router } from 'express';
const router = Router();


router.route('/')
    .get(mongoUsersController.getAllUsers)
    .post(mongoUsersController.addQuestion)

// router.route('/:username')

router.route('/questions/:user')
    .get(mongoUsersController.getUserQuestions);

export default router;