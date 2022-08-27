// dependencies
const { add, view, update, deleteTeacher } = require('../../controllers/user/teacher')

// module scafolding
const express = require('express');
const router = express.Router();

router.route('/')
    .get(view)
    .post(add)
    .put(update)
    .delete(deleteTeacher);



// export module
module.exports = router;