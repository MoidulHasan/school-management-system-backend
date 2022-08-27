// depenciencies
const mongoose = require('mongoose');


// model scafolding
const admissionSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: [true, "First name is required"],
    },

    lastname: {
        type: String,
        required: [true, "Last name is required"],
    },


    birthday: {
        type: String,
        required: [true, "Birth Date is required"],
    },

    bloodGroup: {
        type: String,
        required: false,
    },

    className: {
        type: String,
        required: [true, "Birth Date is required"],
    },


    district: {
        type: String,
        required: [true, "District name is required"],
    },
    division: {
        type: String,
        required: [true, "Division name is required"],
    },

    fathersName: {
        type: String,
        required: [true, "Fathers name is required"],
    },



    gender: {
        type: String,
        required: [true, "Gender is required"],
    },

    guardianEmail: {
        type: String,
        required: [true, "Guardian Email is required"],
    },

    guardianPhone: {
        type: String,
        required: [true, "Guardian Phone is required"],
    },


    mothersName: {
        type: String,
        required: [true, "Mother's name is required"],
    },

    password: {
        type: String,
        required: [true, "Confirmed Password is required"],
    },

    confirmPassword: {
        type: String,
        required: [true, "Confirmed Password is required"],
    },

    studentAddress: {
        type: String,
        required: false,
    },

    studentsEmail: {
        type: String,
        required: [true, "Student Email is required"],
    },
    zipCode: {
        type: String,
        required: false,
    },
    admissionStatus: {
        type: String,
        required: [true, "Admission Status is required"],
    },
    paymentStatus: {
        type: String,
        required: [true, "Admission Status is required"],
    },
});


const admission = mongoose.model("Admission", admissionSchema);


// export model
module.exports = admission;