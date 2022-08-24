// dependencies
const { add, view, update, deleteClassRoom } = require('../../controllers/academic/classRoomController')

// module scafolding
const express = require('express');
const router = express.Router();

router.route('/')
    .get(view)
    .post(add)
    .put(update)
    .delete(deleteClassRoom);


// export module
module.exports = router;