import express from "express";
import register from "../../controllers/MysqlControllers/mySqlRegisterController.js";

const router = express.Router();

router.post('/', register);

export default router;