// dependencies
const { add, view, update, deleteClass } = require('../../controllers/academic/classController')

// module scafolding
const express = require('express');
const router = express.Router();

router.route('/')
    .get(view)
    .post(add)
    .put(update)
    .delete(deleteClass);


console.log("Class routes")

// export module
module.exports = router;