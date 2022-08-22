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
const authController = require('../controllers/authController');
// const userController = require("../controllers/userController");


// import top label route handler
const userRoute = require("./user/userRoutes");
const academicRoute = require('./academic');

// handle base url route
router.all('/', homeController.baseRoute);


// router.use((req, res, next) => {
//     console.log(req)
// })

// add auth controller
router.use(authController.protect);

console.log("Authenticted user")

// add private routes
router.use('/academic/', academicRoute)


// handle user routes
router.use("/user", userRoute);

module.exports = router;
