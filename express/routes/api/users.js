const express = require('express');
const router = express.Router();
const userController = require('../../controllers/usersController');


router.route('/')
    .get(userController.getAllUsers)
    .post(userController.addQuestion)

// router.route('/:username')
    
router.route('/questions/:user')
    .get(userController.getUserQuestions);

module.exports = router;