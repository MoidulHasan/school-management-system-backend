// dependencies
const { add, view, update, deleteClassTime } = require('../../controllers/academic/classTimeController')

// module scafolding
const express = require('express');
const router = express.Router();

router.route('/')
    .get(view)
    .post(add)
    .put(update)
    .delete(deleteClassTime);



// export module
module.exports = router;