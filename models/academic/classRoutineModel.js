// depenciencies
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

// model scafolding
const classRoutineSchema = new mongoose.Schema({
    class: {
        type: ObjectId,
        required: [true, "Class Name is required"],
        ref: "ClassInfo"
    },
    subject: {
        type: ObjectId,
        required: [true, "Subject name is required"],
        ref: "SubjectInfo"
    },
    roomNumber: {
        type: ObjectId,
        required: [true, "Room number is required"],
        ref: "classRoomModel"
    },
    classTime: {
        type: ObjectId,
        required: [true, "Class time is required"],
        ref: "classTime"
    },
    teacher: {
        type: ObjectId,
        required: [true, "Class teacher is required"],
        ref: "Teacher"
    }
});


const classRoutineModel = mongoose.model("classRoutine", classRoutineSchema);


// export model
module.exports = classRoutineModel;