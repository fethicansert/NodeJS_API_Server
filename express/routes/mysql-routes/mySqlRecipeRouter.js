import express from "express";
import { addRecipe, getUserRecipes, deleteRecipe } from "../../controllers/mysql_controllers/mySqlRecipeController.js";

const router = express.Router();

router.post('/', addRecipe);

router.route('/:id')
    .get(getUserRecipes)
    .delete(deleteRecipe)

export default router;

