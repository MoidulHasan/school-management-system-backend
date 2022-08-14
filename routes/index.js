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

// import top label route handler


// handle base url route
router.all('/', homeController.baseRoute);


module.exports = router;
