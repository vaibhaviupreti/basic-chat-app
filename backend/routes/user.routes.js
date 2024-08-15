const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../middlewares/auth');
// router.post('/register', userController.register);
router.post('/login', userController.login);

// To Create a new user
router.post('/create_users', auth, userController.createUser);

// To Get all users
router.get('/get_users', auth, userController.getAllUsers);

// To Get a single user by ID
router.get('/get_user/:id', auth, userController.getUserById);

// To Update a user by ID
router.put('/update_user/:id', auth, userController.updateUser);

// To Delete a user by ID
router.delete('/delete_user/:id', auth, userController.deleteUser);
module.exports = router;