// Dependencies

const admission = require("../../models/admission/admissionModel");
const Students = require("../../models/student/studentModel");
const User = require("../../models/users/userModel");

// module scafolding
const admitController = {};

admitController.add = async (req, res, next) => {
    const studentData = req.body.studentData;
    studentData.role = "student";
    studentData.email = studentData.studentsEmail;
    studentData.name = studentData.firstname + " " + studentData.firstname;
    studentData.birthday = studentData.birthday.slice(0, 10);

    try {
        let saveStudent, saveUser, saveAdmission;

        const isStudent = await Students.find({ studentsEmail: studentData.studentsEmail });
        const isUser = await User.find({ email: studentData.studentsEmail });


        if (isStudent.length > 0 || isUser.length > 0) {
            res.status(400).json({
                status: 'fail',
                message: 'Student email is already registeered',
                data: null
            });
        } else {
            if (studentData.admissionStatus === "Approved") {


                const lastSerialNo = await Students.find({ className: studentData.className }).sort({ serialNo: -1 }).limit(1);

                const serialNo = lastSerialNo.length > 0 ? lastSerialNo[0].serialNo + 1 : 1;

                studentData.serialNo = serialNo;

                saveStudent = await Students.create(studentData);
                saveUser = await User.create(studentData);
            }
            else {
                saveAdmission = await admission.create(studentData);
            }

            if (saveStudent && saveUser) {
                res.status(200).json({
                    status: 'success',
                    message: 'Form data successfully Saved.',
                });
            } else if (saveAdmission) {
                res.status(200).json({
                    status: 'success',
                    message: 'Form data successfully Saved to pending application list.',
                });
            }
            else {
                res.status(500).json({
                    status: 'fail',
                    message: 'Internal server error 1',
                    data: null
                });
            }
        }



    } catch (err) {
        console.log(err);

        if (err.code === 11000) {
            console.log(err);
            const dupField = Object.values(err.keyValue);
            res.status(400).json({
                status: 'fail',
                message: `${dupField} already exist, `,
                data: null,
                // error: 
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error 2',
                data: null,
                error: err
            });
        }
    }
}


admitController.view = async (req, res, next) => {
    try {
        const applications = await admission.find();

        if (applications) {
            res.status(200).json({
                status: 'success',
                message: 'Applications data Found.',
                data: applications
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


admitController.accept = async (req, res, next) => {
    req.body.
        studentData.admissionStatus === "Approved"
}

admitController.reject = async (req, res, next) => {
    try {
        const applicationId = req.body.applicationId;
        console.log(applicationId)

        const deleteApplication = await admission.findByIdAndDelete(applicationId, {
            admissionStatus: "Rejected"
        });


        if (deleteApplication.admissionStatus === "Rejected") {
            res.status(200).json({
                status: 'success',
                message: 'Application rejected successfully.',
                data: deleteClass
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'Internal server error',
                data: null
            });
        }

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
            data: null,
            error: error,
        });
    }
}

// module export
module.exports = admitController;