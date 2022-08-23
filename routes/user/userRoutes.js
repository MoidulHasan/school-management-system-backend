/**
 * Name: User Routes
 * Descriptions: This module provide user related routes
 * Author: Moidul Hasan Khan
 * Date: 15 August 2022
 */

// Dependencies
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/auth');


// Protect all routes after this middleware
// router.use(authController.protect);

// router.delete('/deleteMe', userController.deleteMe);

// // Only admin have permission to access for the below APIs 
// router.use(authController.restrictTo('admin'));

// router
//     .route('/')
//     .get(userController.getAllUsers);


// router
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);

module.exports = router;