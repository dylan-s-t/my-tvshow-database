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

// get url and send view
router.post('/searchDatabase/searchByName', (req, res) => {
    var db = utils.getDb();
    mySearchEntry= req.body.searchShowName;

    db.collection('tvshows').find().toArray()
        .then(result => {
            console.log(result)
            for (i = 0; i < result.length; i++) {
                console.log(result[i].name)
                if(result[i].name == mySearchEntry) {
                    searchResultsArray.push(result[i])
                }
            }
            if(searchResultsArray.length == 0) {
                res.send('sorry, no results found.')
            }
            res.send(searchResultsArray)
        })
        .catch(error => {
            console.log('could not return database items')
            console.log(`error: ${error}`)
        })
})

//export router for use by app
module.exports = router;
