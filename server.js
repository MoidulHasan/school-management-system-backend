/**
 * Name: Server
 * Descriptions: This module provide server for the rest api services
 * Author: Moidul Hasan Khan
 * Date: 14 August 2022
 */


// Dependencies
const database = require('./config/db')
const dotenv = require('dotenv');
const app = require('./app');

// config environment path
dotenv.config({
    path: './config.env'
});


// connect the database
database.connect();


// Handle uncaught exception
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});


// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});



// Handle Unhandled Rejection
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});