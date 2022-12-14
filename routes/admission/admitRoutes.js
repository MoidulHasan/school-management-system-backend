// dependencies
const { add, view, update, reject } = require('../../controllers/admission/admitController')

// module scafolding
const express = require('express');
const router = express.Router();

router.route('/')
    .get(view)
    .post(add)
    // .put(update)
    .delete(reject);



// export module
module.exports = router;