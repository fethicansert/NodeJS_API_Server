import { Router } from "express";
const router = Router();
import trafficSignController from '../../controllers/mongo_controllers/mongoTrafficQuestionController.js'

router.route('/')
    .get(trafficSignController.getAllTrafficSignQuestions)
    .post(trafficSignController.createTraffinSingQuestion)
    .put()
    .delete()


router.route('/:soru')
    .get(trafficSignController.getTrafficSignQuestions);

export default router;