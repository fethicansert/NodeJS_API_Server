import express from "express";
const router = express.Router();
import groqController from '../../controllers/AI_Controllers/groqAIController.js'


router.post('/', groqController.chat);


export default router