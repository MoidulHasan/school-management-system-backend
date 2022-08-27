// Dependencies

const Students = require("../../models/student/studentModel");


// Module Scafolding
const studentController = {};

studentController.studentAddService = async (studentData) => {
    let resp;
    try {
        const saveStudentData = await Students.create(studentData);

        if (saveStudentData) {
            resp = {
                status: 'success',
                message: 'Form data successfully Saved.',
                data: saveStudentData
            }
        } else {
            resp = {
                status: 'fail',
                message: 'Internal server error ',
                data: null
            }
        }
    } catch (err) {
        resp = {
            status: 'fail',
            message: 'Internal server error ',
            data: null,
            error: err
        }
    }
    return resp;
}

studentController.add = async (req, res, next) => {
    try {
        const studentData = req.studentData;

        const saveStudentData = await Students.create(studentData);

        if (saveStudentData) {
            res.status(200).json({
                status: 'success',
                message: 'Form data successfully Saved.',
                data: saveStudentData
            });
        }
        else {
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error ',
                data: null
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'Internal server error ',
            data: null,
            error: err
        });
    }
}


studentController.view = async (req, res, next) => {
    try {
        const studentData = await Students.find();

        if (studentData) {
            res.status(200).json({
                status: 'success',
                message: 'Student data Found.',
                data: studentData,
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Student data not Found.',
                data: studentData,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error.',
            data: null,
        });
    }
}
// export module

module.exports = studentController;