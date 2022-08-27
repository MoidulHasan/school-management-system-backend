// Dependencies
const Teacher = require("../../models/users/teacher/teacherModel");
const User = require("../../models/users/userModel");


// module scafolding
const teacherController = {};


teacherController.add = async (req, res, next) => {
    const teacherData = req.body.teacherData;
    teacherData.role = "teacher";

    try {
        const isUser = await User.find({ email: teacherData.email });
        if (isUser) {
            const saveUser = await User.create(teacherData);
            const saveTeacher = await Teacher.create(teacherData);

            if (saveTeacher && saveUser) {
                res.status(200).json({
                    status: 'success',
                    message: 'Form data successfully Saved.',
                });
            }
            else {
                res.status(500).json({
                    status: 'fail',
                    message: 'Invalid Input',
                    data: null
                });
            }
        }
        else {
            res.status(500).json({
                status: 'fail',
                message: 'This email is already registered',
                data: null
            });
        }
    } catch (err) {
        console.log(err);

        if (err.code === 11000) {
            const dupField = Object.values(err.keyValue);
            res.status(400).json({
                status: 'fail',
                message: `${dupField} already exist, `,
                data: null,
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error',
                data: null,
                error: err
            });
        }
    }
}


teacherController.update = async (req, res, next) => {
    const teacherData = req.body.teacherData;
    teacherData.role = "teacher";

    try {
        const isUser = await User.find({ email: teacherData.email });
        if (isUser.length > 0) {

            const updateUser = await User.findOneAndUpdate({ email: teacherData.email }, teacherData);
            const updateTeacher = await Teacher.findOneAndUpdate({ email: teacherData.email }, teacherData);

            if (updateUser && updateTeacher) {
                res.status(200).json({
                    status: 'success',
                    message: 'Form data successfully Saved.',
                });
            }
            else {
                res.status(500).json({
                    status: 'fail',
                    message: 'Invalid Input',
                    data: null
                });
            }
        }
        else {
            res.status(500).json({
                status: 'fail',
                message: 'This email is not registered',
                data: null
            });
        }
    } catch (err) {
        console.log(err);

        if (err.code === 11000) {
            const dupField = Object.values(err.keyValue);
            res.status(400).json({
                status: 'fail',
                message: `${dupField} already exist, `,
                data: null,
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error',
                data: null,
                error: err
            });
        }
    }
}


teacherController.view = async (req, res, next) => {
    try {
        const teachers = await Teacher.find();

        if (teachers) {
            res.status(200).json({
                status: 'success',
                message: 'Teachers data Found.',
                data: teachers
            });
        }
        else {
            res.status(500).json({
                status: 'fail',
                message: 'Internal Server Error.',
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'Internal Server Error.',
            error: err
        });
    }
}


teacherController.deleteTeacher = async (req, res, next) => {
    const email = req.body.email;

    try {
        const isUser = await User.find({ email: email });
        if (isUser.length > 0) {

            const deleteUser = await User.findOneAndDelete({ email: email });
            const deleteTeacher = await Teacher.findOneAndDelete({ email: email });

            if (deleteUser && deleteTeacher) {
                res.status(200).json({
                    status: 'success',
                    message: 'Deleted Successfully.',
                });
            }
            else {
                res.status(500).json({
                    status: 'fail',
                    message: 'Invalid Input',
                    data: null
                });
            }
        }
        else {
            res.status(500).json({
                status: 'fail',
                message: 'This email is not registered',
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


// module export
module.exports = teacherController;