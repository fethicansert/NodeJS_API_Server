import express from "express";
import auth from "../../controllers/MysqlControllers/mySqlAuthController.js";

const router = express.Router();

router.post('/', auth);

export default router;