// depenciencies
const mongoose = require('mongoose');


// model scafolding
const teacherSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "This email is already registered"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        unique: [true, "This Phone is already registered"],
    },

});



const Teacher = mongoose.model("Teacher", teacherSchema);


// export model
module.exports = Teacher;