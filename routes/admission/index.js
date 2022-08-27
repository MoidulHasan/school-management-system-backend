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
const admitRoutes = require('./admitRoutes');


// handle routes
router.use('/admit', admitRoutes);


// export module
module.exports = router;
