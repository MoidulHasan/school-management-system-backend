// Dependencies
const ClassTime = require('../../models/academic/classTimeModel')
const { timeOverlaped } = require('../../utils/helpers');


// module scafolding
const classTimeController = {};



// add a class to class list
classTimeController.add = async (req, res, next) => {

    const startTime = typeof req.body.startTime === 'string' && req.body.startTime.length > 0 ? req.body.startTime : false;
    const endTime = typeof req.body.endTime === 'string' && req.body.endTime.length > 0 ? req.body.endTime : false;


    if (startTime && endTime) {

        try {
            const classTimeData = {
                startTime: startTime,
                endTime: endTime
            };

            // find all saved class time and check if this class time overlap any class time
            const savedClassTime = await ClassTime.find();

            if (savedClassTime.length > 0) {
                const overlapedTime = timeOverlaped(classTimeData, savedClassTime);

                if (overlapedTime.length > 0) {
                    res.status(400).json({
                        status: 'fail',
                        message: `This class time is overlaped with other class`,
                        data: overlapedTime
                    });
                } else {
                    const saveClassTime = await ClassTime.create(classTimeData);

                    if (saveClassTime._id) {
                        res.status(200).json({
                            status: 'success',
                            message: 'Class time data successfully Saved.',
                            data: saveClassTime
                        });
                    } else {
                        res.status(500).json({
                            status: 'fail',
                            message: 'Internal server error 1',
                            data: null
                        });
                    }
                }
            } else {
                const saveClassTime = await ClassTime.create(classTimeData);

                if (saveClassTime._id) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Class time data successfully Saved.',
                        data: saveClassTime
                    });
                } else {
                    res.status(500).json({
                        status: 'fail',
                        message: 'Internal server error 2',
                        data: null
                    });
                }
            }
        } catch (err) {
            if (err.code === 11000) {
                res.status(400).json({
                    status: 'fail',
                    message: 'This class start time or end time is already exist',
                    data: null
                });
            } else {
                res.status(500).json({
                    status: 'fail',
                    message: 'Internal server error 3',
                    data: null
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
classTimeController.view = async (req, res, next) => {


    try {
        const classTimeData = await ClassTime.find();


        if (classTimeData.length > 0) {
            res.status(200).json({
                status: 'success',
                message: "Class time info found",
                data: classTimeData
            });
        }
        else if (classTimeData.length === 0) {
            res.status(500).json({
                status: 'fail',
                message: 'No class time data found',
                data: classTimeData
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


// Update class data
classTimeController.update = async (req, res, next) => {
    try {

        // console.log(req.body);

        const currentClassTime = typeof req.body.currentClassTime === 'object' ? req.body.currentClassTime : false;
        const updatedClassTime = typeof req.body.updatedClassTime === 'object' ? req.body.updatedClassTime : false;

        // console.log(currentClassTime, " ", updatedClassTime)

        if (currentClassTime && updatedClassTime) {


            const currStartTime = typeof currentClassTime.startTime === 'string' ? currentClassTime.startTime : false;
            const currEndTime = typeof currentClassTime.endTime === 'string' ? currentClassTime.endTime : false;
            const currId = typeof currentClassTime.id === 'string' ? currentClassTime.id : false;

            const updateStartTime = typeof updatedClassTime.startTime === 'string' ? updatedClassTime.startTime : false;
            const updateEndTime = typeof updatedClassTime.endTime === 'string' ? updatedClassTime.endTime : false;



            if (currStartTime && currEndTime && updateStartTime && updateEndTime && currId) {
                const currClassTimeData = {
                    startTime: currStartTime,
                    endTime: currEndTime
                };

                const updateClassTimeData = {
                    startTime: updateStartTime,
                    endTime: updateEndTime
                }

                // find all saved class time and check if this class time overlap any class time
                const savedClassTime = await ClassTime.find();

                if (savedClassTime.length > 0) {
                    const overlapedTime = timeOverlaped(updateClassTimeData, savedClassTime, currId);
                    // console.log(overlapedTime)


                    if (overlapedTime.length > 0) {
                        res.status(400).json({
                            status: 'fail',
                            message: `This class time is overlaped with other class`,
                            data: overlapedTime
                        });
                    } else {


                        const updateClassTime = await ClassTime.findOneAndUpdate(currClassTimeData, updateClassTimeData);


                        if (updateClassTime) {


                            res.status(200).json({
                                status: 'success',
                                message: 'Class time data successfully Saved.',
                                data: updateClassTime
                            });

                        } else {
                            res.status(500).json({
                                status: 'fail',
                                message: 'Internal server error 1',
                                data: null
                            });
                        }
                    }
                } else {
                    const updateClassTime = await ClassTime.findOneAndUpdate(currClassTimeData, updateClassTimeData);

                    if (updateClassTime._id) {
                        res.status(200).json({
                            status: 'success',
                            message: 'Class time data successfully Updated.',
                            data: updateClassTime
                        });
                    } else {
                        res.status(500).json({
                            status: 'fail',
                            message: 'Internal server error 2',
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
        } else {
            res.status(400).json({
                status: "fail",
                message: "Invalid input",
                data: null
            });
        }

    }
    catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                status: 'fail',
                message: 'This class time is already exist',
                data: null
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error 3',
                data: null
            });
        }
    }
}


// delete a class
classTimeController.deleteClassTime = async (req, res, next) => {

    try {
        const classTimeid = req.body.classTimeid ? req.body.classTimeid : false;

        if (classTimeid) {
            const classTimeData = await ClassTime.find({
                _id: classTimeid
            })

            if (classTimeData.length === 0) {
                res.status(500).json({
                    status: 'fail',
                    message: 'No class time data found',
                    data: classTimeData
                });
            } else {
                const deleteClassTime = await ClassTime.findOneAndDelete({ _id: classTimeid });

                if (deleteClassTime) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Time data successfully Deleted.',
                        data: deleteClassTime
                    });
                } else {
                    res.status(500).json({
                        status: 'fail',
                        message: 'Internal server error ',
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
module.exports = classTimeController;
