const express = require('express');
const router = express.Router();
const utils = require('../utils');
const requestCountryData = require('../requestCountryData');
//load this middleware that is built into express for json (you can get it without doing this but it is more messy and more lines of code)
// parse application/json
router.use(express.json());
// parse application/x-www-form-urlencoded <- this is the type that you set
router.use(express.urlencoded({ extended: true})); // true allows complicated things to parse?



// get url and send view
router.get('/addCapitalCities/:country', (req, res) => {
    var db = utils.getDb();
    console.log(req.params.country);
    requestCountryData.getCountryInfo(req.params.country)
    .then(countryResult => {
        db.collection('tvshows').find().toArray()
        .then(result => {
            let capitalId = result[result.length-1]._id;
            db.collection('tvshows').updateOne({ _id: capitalId },
                { $set:
                   {
                     network_capital: countryResult.name
                   }
                })
        res.send(`updated entry with capital ${countryResult.name}`);
        })
        .catch(error => {
            console.log('could not return database items')
            console.log(`error: ${error}`)
            res.send(`error: ${error}`)
        })
    })
    .catch((error) => {
        console.log(error);
        res.send(`Error: ${error}`);
    })
})

//export router for use by app
module.exports = router;
