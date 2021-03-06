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
router.post('/searchDatabase/searchByGenre', (req, res) => {
    var db = utils.getDb();
    mySearchEntry= req.body.searchShowGenre;

    db.collection('tvshows').find().toArray()
        .then(result => {
            console.log(result)
            for (i = 0; i < result.length; i++) {
                console.log(result[i].genre)
                if(result[i].genre == mySearchEntry) {
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
