// depenciencies
const mongoose = require('mongoose');


// model scafolding
const studentSchema = new mongoose.Schema({

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

    studentAddress: {
        type: String,
        required: false,
    },

    studentsEmail: {
        type: String,
        required: [true, "Student Email is required"],
        unique: [true, "This email is already registered"],
    },

    zipCode: {
        type: String,
        required: false,
    },

    serialNo: {
        type: Number,
        required: true
    }

});


// // encrypt the password using 'bcryptjs'
// // Mongoose -> Document Middleware
// admissionSchema.pre("save", async function (next) {
//     // check the password if it is modified
//     if (!this.isModified("password")) {
//         return next();
//     }

//     // Hashing the password
//     this.password = await bcrypt.hash(this.password, 12);

//     next();
// });



const Students = mongoose.model("Students", studentSchema);


// export model
module.exports = Students;