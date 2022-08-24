// depenciencies
const mongoose = require('mongoose');


// model scafolding
const classRoomSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, "Class Name is required"],
        unique: [true, "Class name already exist"]
    }
});


const classRoomModel = mongoose.model("classRoomModel", classRoomSchema);


// export model
module.exports = classRoomModel;