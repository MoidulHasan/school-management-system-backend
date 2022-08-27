// Dependencies
const ClassRoutine = require('../../models/academic/classRoutineModel');
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
        )
            .populate("class")
            .populate("subject")
            .populate("roomNumber")
            .populate("classTime")
            .populate("teacher")


            : await ClassRoutine.find()
                .populate("class")
                .populate("subject")
                .populate("roomNumber")
                .populate("classTime")
                .populate("teacher");


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
        console.log(err)
        res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
            data: null
        });
    }
}


// Update class data
classRoutioneController.update = async (req, res, next) => {

    const routineId = typeof req.body.routine === "string" && typeof ObjectId(req.body.routine) === "object" ? ObjectId(req.body.routine) : false;
    const classId = typeof req.body.class === "string" && typeof ObjectId(req.body.class) === "object" ? ObjectId(req.body.class) : false;
    const subjectId = typeof req.body.subject === "string" && typeof ObjectId(req.body.subject) === "object" ? ObjectId(req.body.subject) : false;
    const classRoomId = typeof req.body.classRoom === "string" && typeof ObjectId(req.body.classRoom) === "object" ? ObjectId(req.body.classRoom) : false;
    const classTimeId = typeof req.body.classTime === "string" && typeof ObjectId(req.body.classTime) === "object" ? ObjectId(req.body.classTime) : false;
    const classTeacherId = typeof req.body.classTeacher === "string" && typeof ObjectId(req.body.classTeacher) === "object" ? ObjectId(req.body.classTeacher) : false;

    const isAllDataValid = routineId && classId && subjectId && classRoomId && classTimeId && classTeacherId;

    if (isAllDataValid) {

        try {

            // check if this subject's routine already done
            const isRoutineExist = await ClassRoutine.find({
                _id: routineId
            });


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

            if (isRoutineExist.length > 0) {
                res.status(400).json({
                    status: 'fail',
                    message: 'No routine found with this id',
                    data: null
                });
            }
            else if (isClassAndSubjectExist.length > 0) {
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

                const updateRoutine = await ClassRoutine.findOneAndUpdate({ _id: routineId }, routine);

                if (updateRoutine) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Class routine successfully updated!',
                        data: updateRoutine
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


// delete a class
classRoutioneController.deleteRoutine = async (req, res, next) => {

    try {
        const routineId = typeof req.body.routineId === 'string' && req.body.routineId.length > 0 ? req.body.routineId : false;

        if (routineId) {
            const routineData = await ClassRoutine.find({
                _id: routineId
            });


            if (routineData.length === 0) {
                res.status(500).json({
                    status: 'fail',
                    message: 'No class routine found with this routine id',
                    data: routineData
                });
            } else {
                const deleteRoutine = await ClassRoutine.findOneAndDelete({ _id: routineId });

                if (deleteRoutine) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Class Routine successfully Deleted.',
                        data: deleteClass
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
            data: null,
            error: err
        });
    }
}


// export module
module.exports = classRoutioneController;
