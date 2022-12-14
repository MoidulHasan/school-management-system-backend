/**
 * Name: School Management System REST API Application
 * Descriptions: This module provide main application for the rest api of school management system
 * Author: Moidul Hasan Khan
 * Date: 14 August 2022
 */

// Dependencies
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

const globalErrHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const router = require("./routes");

// module scafolding
const app = express();

// Allow Cross-Origin requests
app.use(cors({
    origin: '*'
}));

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: "Too Many Request from this IP, please try again in an hour",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(
    express.json({
        limit: "15kb",
    })
);

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Routes handler for all router
app.use("/api/v1/", router);

// handle undefined Routes
app.use("*", (req, res, next) => {
    // console.log(req);
    const err = new AppError(404, "fail", "undefined route");
    next(err, req, res, next);
});

// handle global error
app.use(globalErrHandler);

module.exports = app;
