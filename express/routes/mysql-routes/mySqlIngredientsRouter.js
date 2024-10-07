import express from "express";
import mySqlIngredientsController from "../../controllers/mysql_controllers/mySqlIngredientsController.js";

const router = express.Router();

router.get('/', mySqlIngredientsController.getIngredients);


export default router;