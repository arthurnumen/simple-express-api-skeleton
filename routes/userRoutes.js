const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const uploadHelper = require('../helpers/uploadHelper');

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', uploadHelper.upload.single('profilePicture'), userController.updateUser);

module.exports = router;

