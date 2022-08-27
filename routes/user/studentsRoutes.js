// dependencies
const { add, view, update, reject } = require('../../controllers/user/students')

// module scafolding
const express = require('express');
const router = express.Router();

router.route('/')
    .get(view)
    .post(add)
// .put(update)
// .delete(reject);



// export module
module.exports = router;