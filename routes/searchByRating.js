const express = require('express');
const router = express.Router();
const utils = require('../utils');
//load this middleware that is built into express for json (you can get it without doing this but it is more messy and more lines of code)
// parse application/json
router.use(express.json());
// parse application/x-www-form-urlencoded <- this is the type that you set
router.use(express.urlencoded({ extended: true})); // true allows complicated things to parse?

var searchResultsArray = [];
var mySearchEntry;
var pushEntry;

// get url and send view
router.post('/searchDatabase/searchByRating', (req, res) => {
    var db = utils.getDb();
    mySearchEntry= parseFloat(req.body.searchShowRating);

    db.collection('tvshows').find( { "rating": { $gt: mySearchEntry }}).toArray()
    .then(result => {
        console.log(result)
        
        if (result.length == 0) {
            res.send("Sorry, none found!");
        } else {
            res.render('searchResultDisplay.hbs', {
                result: result
            });
        }
    })
    .catch(error => {
        console.log('could not return database items')
        console.log(`error: ${error}`)
    })
})

//export router for use by app
module.exports = router;
