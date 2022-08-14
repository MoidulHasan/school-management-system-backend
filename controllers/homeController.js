/**
 * Name: Home Controller
 * Descriptions: This module provide controller for base url
 * Author: Moidul Hasan Khan
 * Date: 14 August 2022
 */


// Dependencies


// Module Scafolding
const homeController = {};

homeController.baseRoute = (req, res, next) => {
    res.status(200).json({
        status: 200,
        Message: "Welcome to Khan Bari Kingdergarten!"
    })
}

// export module
module.exports = homeController;