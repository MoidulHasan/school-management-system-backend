// depenciencies
const mongoose = require('mongoose');


// model scafolding
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Class Name is required"],
        unique: [true, "Class name already exist"]
    }
});


const Teacher = mongoose.model("Teacher", teacherSchema);


// export model
module.exports = Teacher;