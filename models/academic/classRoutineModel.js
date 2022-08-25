// depenciencies
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

// model scafolding
const classRoutineSchema = new mongoose.Schema({
    class: {
        type: ObjectId,
        required: [true, "Class Name is required"]
    },
    subject: {
        type: ObjectId,
        required: [true, "Subject name is required"]
    },
    roomNumber: {
        type: ObjectId,
        required: [true, "Room number is required"]
    },
    classTime: {
        type: ObjectId,
        required: [true, "Class time is required"]
    },
    classTeacher: {
        type: ObjectId,
        required: [true, "Class teacher is required"]
    }
});


const classRoomModel = mongoose.model("classRoomModel", classRoutineSchema);


// export model
module.exports = classRoomModel;