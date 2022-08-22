/**
 * Name: Academic routes
 * Descriptions: This module provide academic  routes
 * Author: Moidul Hasan Khan
 * Date: 22 August 2022
 */

// Dependencies
const express = require('express');
const router = express.Router();


// Import routes
const classRoutes = require('./classRoutes')
const subjectRoutes = require('./subjectRoutes')



// handle routes
router.use('/class', classRoutes);
router.use('/subject', subjectRoutes);



// export module
module.exports = router;