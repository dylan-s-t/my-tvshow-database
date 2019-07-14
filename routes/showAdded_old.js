const express = require('express');
const router = express.Router();
const requestSingleShow = require('../requestSingleShow.js');
const utils = require('../utils');

const { check, validationResult } = require('express-validator/check');
// if errors, validationResult errors saved in req

//load this middleware that is built into express for json (you can get it without doing this but it is more messy and more lines of code)
// parse application/json
router.use(express.json());
// parse application/x-www-form-urlencoded <- this is the type that you set
router.use(express.urlencoded({ extended: true})); // true allows complicated things to parse?

// declare variables 
var searchShow;
var myShowData

router.post('/showAdded', (req,res) => {
    var db = utils.getDb();
    searchShow = req.body.showName;
    console.log(`getting single show data for ${searchShow}`)
    requestSingleShow.getSingleShow(searchShow)
    .then(showData => {
        let newId = showData.id
        let name = showData.name
        let genre = showData.genres
        let rating = showData.rating.average
        let image = showData.image.medium
        let country = showData.network.country.code
        myShowData = {newId,name,rating,image}
        console.log(myShowData);

        var alreadyAdded = false;

        db.collection('tvshows').find().toArray()
        .then(result => {
            console.log(result)
            
            for (i = 0; i < result.length; i++) {
                console.log(i);
                if(result[i].id == newId) {
                    //res.send(`you have already logged ${name} in your database!`)
                    alreadyAdded = true;
                }
            }
        })
        .catch(error => {
            console.log('could not return database items')
        })
        
        if (alreadyAdded == false) {
            db.collection('tvshows').insertOne({
                id: newId,
                name: name,
                rating: rating,
                image: image,
                genre: genre,
                country: country
                
            }, (err, result) => {
                if(err) {
                    res.send('unable to insert tv show');
                }
                res.render('showAdded.hbs', {
                    showName: name,
                    showGenre: genre,
                    showRating: rating,
                    showImage: image,
                    showNetworkCountry: country
                });
            })
        } else {
            res.send(`you have already logged ${name} in your database!`)
        }
        
    })
    .catch(error => {
        console.log(error);
        res.send(`Error: ${error}`);
    })
});

// export router for use by app
module.exports = router;