// Dependencies

const admission = require("../../models/admission/admissionModel");

// module scafolding
const admitController = {};

admitController.add = async (req, res, next) => {
    const data = req.body.studentData;

    try {
        const saveStudentData = await admission.create(data);

        if (saveStudentData) {
            res.status(200).json({
                status: 'success',
                message: 'Admission data successfully Saved.',
                data: saveStudentData
            });
        } else {
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

// module export
module.exports = admitController;