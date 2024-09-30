import express from "express";
import { addRecipe } from "../../controllers/MysqlControllers/mySqlRecipeController.js";

const router = express.Router();

router.post('/', addRecipe);

export default router;