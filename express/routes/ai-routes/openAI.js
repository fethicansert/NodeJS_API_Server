import express from 'express'
const router = express.Router();
import openAIController from "../../controllers/ai_controllers/openIAController.js"


router.route('/')
    .post(openAIController.chat)

export default router

