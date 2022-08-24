// Dependencies
const SubjectInfo = require('../../models/academic/subjectModel')
const ClassInfo = require('../../models/academic/classModel')

// module scafolding
const subjectController = {};


// add a subject to class list
subjectController.add = async (req, res, next) => {

    const className = typeof req.body.className === 'string' && req.body.className.length > 0 ? req.body.className : false;
    const subjectName = typeof req.body.subjectName === 'string' && req.body.subjectName.length > 0 ? req.body.subjectName : false;


    if (className && subjectName) {

        try {
            const subjectData = {
                "name": subjectName,
                "class": className
            };

            const isSubjectDataExist = await SubjectInfo.find(subjectData);

            const isClassExist = await ClassInfo.find({ name: className });

            if (isSubjectDataExist.length > 0) {
                res.status(400).json({
                    status: 'fail',
                    message: 'This subject name is already exist in this class',
                    data: null
                });
            }
            else if (isClassExist.length === 0 || !isClassExist) {
                res.status(400).json({
                    status: 'fail',
                    message: 'This class name is not exist',
                    data: null
                });
            }
            else {
                const saveSubject = await SubjectInfo.create(subjectData);

                if (saveSubject._id) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Class data successfully Saved.',
                        data: saveSubject
                    });
                } else {
                    res.status(500).json({
                        status: 'fail',
                        message: 'Internal server error',
                        data: null
                    });
                }
            }

        } catch (err) {
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error',
                data: null,
                error: err
            });
        }
    }
    else {
        console.log(className, " ", subjectName)
        res.status(400).json({
            status: "fail",
            message: "Invalid input",
            data: null
        });
    }
}


// view all class data
subjectController.view = async (req, res, next) => {

    const className = typeof req.query.className === 'string' && req.query.className.length > 0 ? req.query.className : false;

    try {
        const isClassExist = await ClassInfo.find({ name: className });

        if (!isClassExist) {
            res.status(400).json({
                status: 'fail',
                message: 'This class name is not exist',
                data: null
            });
        } else {

            const subjectData = className ? await SubjectInfo.find({ class: className }) : await SubjectInfo.find();



            if (subjectData.length > 0) {
                res.status(200).json({
                    status: 'success',
                    message: "Subject info found",
                    data: subjectData
                });
            }
            else if (subjectData.length === 0) {
                res.status(500).json({
                    status: 'fail',
                    message: 'No class data found',
                    data: subjectData
                });
            }
        }


    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
            data: null,
            error: err
        });
    }
}


// // Update class data
// subjectController.update = async (req, res, next) => {
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


// delete a class
subjectController.deleteClass = async (req, res, next) => {
    try {
        const subjectId = typeof req.body.subjectId === 'string' && req.body.subjectId.length > 0 ? req.body.subjectId : false;

        if (subjectId) {
            const subjectData = await SubjectInfo.find({
                _id: subjectId
            })


            if (subjectData.length === 0) {
                res.status(500).json({
                    status: 'fail',
                    message: 'No subject data found with this class name',
                    data: subjectData
                });
            } else {
                const deleteSubject = await SubjectInfo.findOneAndDelete({ _id: subjectId });
                console.log(deleteSubject, " ", subjectId);

                if (deleteSubject._id == subjectId) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Subject data successfully Deleted.',
                        data: deleteSubject
                    });
                } else {
                    res.status(500).json({
                        status: 'fail',
                        message: 'Internal server error',
                        data: null
                    });
                }
            }
        } else {
            res.status(400).json({
                status: "fail",
                message: "Invalid input",
                data: null
            });
        }

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
            data: null
        });
    }
}


// export module
module.exports = subjectController;