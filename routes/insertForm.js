const express = require('express');
const router = express.Router();

// get url and send view
router.get('/addShow', (req, res) => {
    res.render('insertForm.hbs', {
        exampleKey: 'example'
    });
}) 

// export router for use by app
module.exports = router;