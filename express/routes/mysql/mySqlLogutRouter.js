import express from "express";
import logout from "../../controllers/MysqlControllers/mySqlLogoutController.js";

const router = express.Router();

router.post('/', logout);

export default router;