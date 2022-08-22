/**
 * Name: Academic routes
 * Descriptions: This module provide academic  routes
 * Author: Moidul Hasan Khan
 * Date: 22 August 2022
 */

// Dependencies
const express = require('express');
const router = express.Router();
const classRoutes = require('./classRoutes')

const classController = require('../../controllers/academic/classController');

// router.all('/', (req, res, next) => {
//     console.log("called in academic routes")
//     res.status(200).json({
//         status: 'success in academic routes'
//     })
// })

// handle base url route
router.use('/class', classRoutes);

console.log("academic routes")

// handle user routes


// export module
module.exports = router;
