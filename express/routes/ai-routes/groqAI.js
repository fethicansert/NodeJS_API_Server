import express from "express";
const router = express.Router();
import groqController from '../../controllers/ai_controllers/groqAIController.js'


router.post('/', groqController.chat);


export default router