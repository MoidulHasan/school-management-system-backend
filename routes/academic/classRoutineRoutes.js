// dependencies
const { add, view, update, deleteClass } = require('../../controllers/academic/classRoutineController')

// module scafolding
const express = require('express');
const router = express.Router();

router.route('/')
    .get(view)
    .post(add)
// .put(update)
// .delete(deleteClass);


// export module
module.exports = router;