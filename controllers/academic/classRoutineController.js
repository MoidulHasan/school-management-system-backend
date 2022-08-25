// Dependencies
const ClassRoutine = require('../../models/academic/classRoutineModel')
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

// module scafolding
const classRoutioneController = {};


// add a class to class list
classRoutioneController.add = async (req, res, next) => {


    const classId = typeof req.body.class === "string" && typeof ObjectId(req.body.class) === "object" ? ObjectId(req.body.class) : false;
    const subjectId = typeof req.body.subject === "string" && typeof ObjectId(req.body.subject) === "object" ? ObjectId(req.body.subject) : false;
    const classRoomId = typeof req.body.classRoom === "string" && typeof ObjectId(req.body.classRoom) === "object" ? ObjectId(req.body.classRoom) : false;
    const classTimeId = typeof req.body.classTime === "string" && typeof ObjectId(req.body.classTime) === "object" ? ObjectId(req.body.classTime) : false;
    const classTeacherId = typeof req.body.classTeacher === "string" && typeof ObjectId(req.body.classTeacher) === "object" ? ObjectId(req.body.classTeacher) : false;

    const isAllDataValid = classId && subjectId && classRoomId && classTimeId && classTeacherId;

    if (isAllDataValid) {

        try {

            // check if this subject's routine already done
            const isClassAndSubjectExist = await ClassRoutine.find({
                class: classId,
                subject: subjectId
            });

            // check if this room is available
            const isRoomAvailable = await ClassRoutine.find({
                roomNumber: classRoomId,
                classTime: classTimeId
            });

            // check if this room is available
            const isClassTeacherAvailable = await ClassRoutine.find({
                teacher: classTeacherId,
                classTime: classTimeId
            });


            // check if routine is available
            // const routineConflicts = isClassAndSubjectExist.length > 0 || isRoomAvailable.length > 0 || isClassTeacherAvailable.length > 0;

            if (isClassAndSubjectExist.length > 0) {
                res.status(400).json({
                    status: 'fail',
                    message: 'This subject is already added to routine',
                    data: null
                });
            } else if (isRoomAvailable.length > 0) {
                res.status(400).json({
                    status: 'fail',
                    message: 'This room is not available at that time slot',
                    data: null
                });
            }
            else if (isClassTeacherAvailable.length > 0) {
                res.status(400).json({
                    status: 'fail',
                    message: 'This teacher is not available at that time slot',
                    data: null
                });
            }
            else {
                const routine = {
                    class: classId,
                    subject: subjectId,
                    roomNumber: classRoomId,
                    classTime: classTimeId,
                    teacher: classTeacherId,
                }

                const saveRoutine = await ClassRoutine.create(routine);

                if (saveRoutine) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Class routine successfully created!',
                        data: saveRoutine
                    });
                } else {
                    res.status(500).json({
                        status: 'fail',
                        message: 'Internal server error 1',
                        data: null
                    });
                }
            }
        } catch (err) {
            if (err.code === 11000) {
                res.status(400).json({
                    status: 'fail',
                    message: 'This routine have conflicts',
                    data: null
                });
            } else {
                res.status(500).json({
                    status: 'fail',
                    message: 'Internal server error 2',
                    data: err
                });
            }
        }
    }
    else {
        res.status(400).json({
            status: "fail",
            message: "Invalid input",
            data: null
        });
    }
}


// view all class data
classRoutioneController.view = async (req, res, next) => {

    try {

        const classId = typeof req.query.class === "string" && typeof ObjectId(req.query.class) === "object" ? ObjectId(req.query.class) : null;
        const subjectId = typeof req.query.subject === "string" && typeof ObjectId(req.query.subject) === "object" ? ObjectId(req.query.subject) : null;
        const classRoomId = typeof req.query.classRoom === "string" && typeof ObjectId(req.query.classRoom) === "object" ? ObjectId(req.query.classRoom) : null;
        const classTimeId = typeof req.query.classTime === "string" && typeof ObjectId(req.query.classTime) === "object" ? ObjectId(req.query.classTime) : null;
        const classTeacherId = typeof req.query.classTeacher === "string" && typeof ObjectId(req.query.classTeacher) === "object" ? ObjectId(req.query.classTeacher) : null;

        const haveParams = classId != null || subjectId != null || classRoomId != null || classTeacherId != null;
        const routineData = haveParams ? await ClassRoutine.find(
            {
                $or: [
                    { class: classId },
                    { subject: subjectId },
                    { roomNumber: classRoomId },
                    { classTime: classTimeId },
                    { teacher: classTeacherId }
                ]
            }
        ) : await ClassRoutine.find();


        if (routineData.length > 0) {
            res.status(200).json({
                status: 'success',
                message: "Class routine found",
                data: routineData
            });
        }
        else if (routineData.length === 0) {
            res.status(500).json({
                status: 'fail',
                message: 'No class routine found',
                data: routineData
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
            data: null
        });
    }
}


// // Update class data
// classRoutioneController.update = async (req, res, next) => {
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
// classRoutioneController.deleteClass = async (req, res, next) => {

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


// export module
module.exports = classRoutioneController;
