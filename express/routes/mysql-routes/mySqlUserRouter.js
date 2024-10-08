import mySqlUserController from '../../controllers/mysql_controllers/mySqlUserController.js';
import express from "express"
const router = express.Router();

router.route('/:id')
    .put(mySqlUserController.updateUser);


export default router;