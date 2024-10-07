import express from "express";
import { addRecipe, getUserRecipes } from "../../controllers/mysql_controllers/mySqlRecipeController.js";

const router = express.Router();

router.post('/', addRecipe);

router.route('/:id')
    .get(getUserRecipes);

export default router;

