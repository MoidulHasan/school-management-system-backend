// depenciencies
const mongoose = require('mongoose');


// model scafolding
const classTimeSchema = new mongoose.Schema({
    startTime: {
        type: String,
        required: [true, "Class starting time is required"]
    },
    endTime: {
        type: String,
        required: [true, "Class ending time is required"]
    }
});


const classTime = mongoose.model("classTime", classTimeSchema);


// export model
module.exports = classTime;