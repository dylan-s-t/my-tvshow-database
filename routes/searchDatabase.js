const express = require('express');
const router = express.Router();


// get url and send view
router.get('/searchDatabase', (req, res) => {
    res.render('searchDatabase.hbs');
})

// export router for use by app
module.exports = router;
