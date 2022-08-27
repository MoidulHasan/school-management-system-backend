
// Dependencies
const express = require('express');
const router = express.Router();


// Import routes
const students = require('./studentsRoutes');
const teachers = require('./teachersRoutes');


// handle routes
router.use('/students', students);
router.use('/teacher', teachers);


// export module
module.exports = router;
