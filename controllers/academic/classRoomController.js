// Dependencies
const ClassRoom = require('../../models/academic/classRoomModel')

// module scafolding
const classRoomController = {};


// add a class to class list
classRoomController.add = async (req, res, next) => {

    const classRoom = typeof req.body.classRoom === 'number' && req.body.classRoom > 0 ? req.body.classRoom : false;



    if (classRoom) {

        try {
            const classRoomData = {
                number: classRoom
            };
            const saveClassRoom = await ClassRoom.create(classRoomData);

            if (saveClassRoom) {
                res.status(200).json({
                    status: 'success',
                    message: 'Class room data successfully Saved.',
                    data: saveClassRoom
                });
            } else {
                res.status(500).json({
                    status: 'fail',
                    message: 'Internal server error ',
                    data: null
                });
            }


        } catch (err) {
            if (err.code === 11000) {
                res.status(400).json({
                    status: 'fail',
                    message: 'This class room is already exist',
                    data: null
                });
            } else {
                res.status(500).json({
                    status: 'fail',
                    message: 'Internal server error ',
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
classRoomController.view = async (req, res, next) => {


    try {
        const classRoomData = await ClassRoom.find();


        if (classRoomData.length > 0) {
            res.status(200).json({
                status: 'success',
                message: "Class room info found",
                data: classRoomData
            });
        }
        else if (classRoomData.length === 0) {
            res.status(500).json({
                status: 'fail',
                message: 'No class data found',
                data: classRoomData
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
classRoomController.update = async (req, res, next) => {
    try {

        const prevClassRoom = typeof req.body.prevClassRoom === 'number' && req.body.prevClassRoom > 0 ? req.body.prevClassRoom : false;
        const nextClassRoom = typeof req.body.nextClassRoom === 'number' && req.body.nextClassRoom > 0 ? req.body.nextClassRoom : false;
        if (prevClassRoom && nextClassRoom) {

            const classRoomData = await ClassRoom.find({
                number: prevClassRoom
            })

            if (classRoomData.length === 0) {
                res.status(500).json({
                    status: 'fail',
                    message: 'No class room data found with this class room number',
                    data: classRoomData
                });
            }
            else if (classRoomData.length >= 0) {
                const isNextClassRoomNumberAvailable = await ClassRoom.find({
                    number: nextClassRoom
                });

                if (!isNextClassRoomNumberAvailable._id) {
                    const classRoomData = {
                        number: nextClassRoom
                    };
                    const saveClassRoom = await ClassRoom.findOneAndUpdate({ number: prevClassRoom }, classRoomData);

                    if (saveClassRoom._id) {
                        res.status(200).json({
                            status: 'success',
                            message: 'Class room data successfully Updated.',
                            data: saveClassRoom
                        });
                    } else {
                        res.status(500).json({
                            status: 'fail',
                            message: 'Internal server error',
                            data: null
                        });
                    }
                }
                else {
                    res.status(500).json({
                        status: 'fail',
                        message: 'Class room with number is already exist!',
                        data: isNextClassRoomNumberAvailable
                    });
                }
            }
            else {
                res.status(500).json({
                    status: 'fail',
                    message: 'Internal server error',
                    data: null
                });
            }
        } else {

            res.status(400).json({
                status: "fail",
                message: "Invalid input 1",
                data: null
            });
        }

    }
    catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                status: 'fail',
                message: 'This class room number is already exist',
                data: null
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error',
                data: null
            });
        }
    }
}


// delete a class
classRoomController.deleteClassRoom = async (req, res, next) => {

    try {
        const classRoom = typeof req.body.classRoom === 'number' && req.body.classRoom > 0 ? req.body.classRoom : false;

        if (classRoom) {
            const classRoomData = await ClassRoom.find({
                number: classRoom
            })


            if (classRoomData.length === 0) {
                res.status(500).json({
                    status: 'fail',
                    message: 'No class room data found with this class number',
                    data: classRoomData
                });
            } else {
                const deleteClass = await ClassRoom.findOneAndDelete({ number: classRoom });

                if (deleteClass.number === classRoom) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Class room data successfully Deleted.',
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
module.exports = classRoomController;
