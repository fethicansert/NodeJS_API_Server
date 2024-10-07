import express from "express";
import auth from "../../controllers/mysql_controllers/mySqlAuthController.js";

const router = express.Router();

router.post('/', auth);

export default router;