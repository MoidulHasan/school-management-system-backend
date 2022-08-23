/**
 * Name: Routes
 * Descriptions: This module provide top lavel routes for this rest api application
 * Author: Moidul Hasan Khan
 * Date: 14 August 2022
 */

// Dependencies
const express = require('express');
const router = express.Router();

// import route controller for base url
const homeController = require("../controllers/homeController");
const authController = require('../controllers/auth');
// const userController = require("../controllers/userController");


// import top label route handler
const userRoute = require("./user/userRoutes");
const academicRoute = require('./academic');

// public routes
router.all('/', homeController.baseRoute);
router.all('/login', authController.login);


// add auth controller
router.use(authController.protect);


// add private routes
router.use('/academic/', academicRoute);
router.use("/user", userRoute);

module.exports = router;
