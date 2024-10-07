import express from "express";
import register from "../../controllers/mysql_controllers/mySqlRegisterController.js";

const router = express.Router();

router.post('/', register);

export default router;