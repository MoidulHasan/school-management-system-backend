// depenciencies
const mongoose = require('mongoose');


// model scafolding
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subject Name is required"]
    },
    class: {
        type: String,
    }
});


const SubjectInfo = mongoose.model("SubjectInfo", subjectSchema);


// export model
module.exports = SubjectInfo;