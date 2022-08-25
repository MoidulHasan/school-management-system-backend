// // Dependencies
// const ClassInfo = require('../../models/academic/classModel')

// // module scafolding
// const classTimeController = {};


// // add a class to class list
// classTimeController.add = async (req, res, next) => {

//     const className = typeof req.body.className === 'string' && req.body.className.length > 0 ? req.body.className : false;
//     const serialNo = typeof req.body.serialNo === 'number' && req.body.serialNo > 0 ? req.body.serialNo : false;


//     if (className && serialNo) {

//         try {
//             const classData = {
//                 "name": className,
//                 "serialNo": serialNo
//             };
//             const saveClass = await ClassInfo.create(classData);

//             if (saveClass._id) {
//                 res.status(200).json({
//                     status: 'success',
//                     message: 'Class data successfully Saved.',
//                     data: saveClass
//                 });
//             } else {
//                 res.status(500).json({
//                     status: 'fail',
//                     message: 'Internal server error',
//                     data: null
//                 });
//             }


//         } catch (err) {
//             if (err.code === 11000) {
//                 res.status(400).json({
//                     status: 'fail',
//                     message: 'This class name or serial no is already exist',
//                     data: null
//                 });
//             } else {
//                 res.status(500).json({
//                     status: 'fail',
//                     message: 'Internal server error',
//                     data: null
//                 });
//             }
//         }
//     }
//     else {
//         res.status(400).json({
//             status: "fail",
//             message: "Invalid input",
//             data: null
//         });
//     }
// }


// // view all class data
// classTimeController.view = async (req, res, next) => {


//     try {
//         const classData = await ClassInfo.find();


//         if (classData.length > 0) {
//             res.status(200).json({
//                 status: 'success',
//                 message: "Class info found",
//                 data: classData
//             });
//         }
//         else if (classData.length === 0) {
//             res.status(500).json({
//                 status: 'fail',
//                 message: 'No class data found',
//                 data: classData
//             });
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             status: 'fail',
//             message: 'Internal server error',
//             data: null
//         });
//     }
// }


// // Update class data
// classTimeController.update = async (req, res, next) => {
//     try {

//         const currentClassName = typeof req.body.currentClassName === 'string' && req.body.currentClassName.length > 0 ? req.body.currentClassName : false;
//         const className = typeof req.body.className === 'string' && req.body.className.length > 0 ? req.body.className : false;
//         const serialNo = typeof req.body.serialNo === 'number' && req.body.serialNo > 0 ? req.body.serialNo : false;

//         if (currentClassName && className && serialNo) {

//             const classData = await ClassInfo.find({
//                 name: currentClassName
//             })

//             if (classData.length === 0) {
//                 res.status(500).json({
//                     status: 'fail',
//                     message: 'No class data found with this class name',
//                     data: classData
//                 });
//             }
//             else if (classData.length >= 0) {
//                 const classData = {
//                     "name": className,
//                     "serialNo": serialNo
//                 };
//                 const saveClass = await ClassInfo.findOneAndUpdate({ name: currentClassName }, classData);

//                 if (saveClass._id) {
//                     res.status(200).json({
//                         status: 'success',
//                         message: 'Class data successfully Updated.',
//                         data: saveClass
//                     });
//                 } else {
//                     res.status(500).json({
//                         status: 'fail',
//                         message: 'Internal server error',
//                         data: null
//                     });
//                 }
//             }
//             else {
//                 res.status(500).json({
//                     status: 'fail',
//                     message: 'Internal server error',
//                     data: null
//                 });
//             }
//         } else {
//             res.status(400).json({
//                 status: "fail",
//                 message: "Invalid input",
//                 data: null
//             });
//         }

//     }
//     catch (err) {
//         if (err.code === 11000) {
//             res.status(400).json({
//                 status: 'fail',
//                 message: 'This class name or serial no is already exist',
//                 data: null
//             });
//         } else {
//             res.status(500).json({
//                 status: 'fail',
//                 message: 'Internal server error',
//                 data: null
//             });
//         }
//     }
// }


// // delete a class
// classTimeController.deleteClass = async (req, res, next) => {

//     try {
//         const className = typeof req.body.className === 'string' && req.body.className.length > 0 ? req.body.className : false;

//         if (className) {
//             const classData = await ClassInfo.find({
//                 name: className
//             })


//             if (classData.length === 0) {
//                 res.status(500).json({
//                     status: 'fail',
//                     message: 'No class data found with this class name',
//                     data: classData
//                 });
//             } else {
//                 const deleteClass = await ClassInfo.findOneAndDelete({ name: className });

//                 if (deleteClass.name === className) {
//                     res.status(200).json({
//                         status: 'success',
//                         message: 'Class data successfully Deleted.',
//                         data: deleteClass
//                     });
//                 } else {
//                     res.status(500).json({
//                         status: 'fail',
//                         message: 'Internal server error',
//                         data: null
//                     });
//                 }
//             }
//         } else {
//             res.status(400).json({
//                 status: "fail",
//                 message: "Invalid input",
//                 data: null
//             });
//         }

//     } catch (err) {
//         res.status(500).json({
//             status: 'fail',
//             message: 'Internal server error',
//             data: null,
//             error: err
//         });
//     }


// }


// // export module
// module.exports = classTimeController;
