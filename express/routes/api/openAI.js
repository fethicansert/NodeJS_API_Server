import express from 'express'
const router = express.Router();
import openAIController from '../../controllers//AI_Controllers/openIAController.js'


router.route('/')
    .post(openAIController.askQuestion)

export default router