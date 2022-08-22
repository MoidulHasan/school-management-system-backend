// depenciencies
const mongoose = require('mongoose');


// model scafolding
const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Class Name is required"],
        unique: [true, "Class name already exist"]
    },
    serialNo: {
        type: Number,
        required: [true, "Class serial no is required"],
        unique: [true, "Class name already exist"]
    },
});


const ClassInfo = mongoose.model("ClassInfo", classSchema);


// export model
module.exports = ClassInfo;