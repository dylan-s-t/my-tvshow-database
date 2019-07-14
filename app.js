/************************************************************************************

BCIT COMP 2912
FINAL

author: DYLAN TRERISE
date: 11-JUL-2019

Country data from REST countries (https://restcountries.eu)
TV Show data from TVMAZE (http://www.tvmaze.com/api)

*************************************************************************************/


// import necessary dependancy packages
const express = require('express');
const app = express(); // creates express application that allows you to use the methods in express?
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
const utils = require('./utils');
// import necessary routes
const insertForm = require('./routes/insertForm');
const showAdded = require('./routes/showAdded');
const searchDatabase = require('./routes/searchDatabase');
const searchByName = require('./routes/searchByName');
const searchByGenre = require('./routes/searchByGenre');
const searchByRating = require('./routes/searchByRating');
const addCapitalCities = require('./routes/addCapitalCities');

// register helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('getCurrentTime', () => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
})

//depending on views, perform different gets
app.get('/addShow', insertForm);

app.post('/showAdded', showAdded);

app.get('/searchDatabase', searchDatabase);

app.post('/searchDatabase/searchByName', searchByName);

app.post('/searchDatabase/searchByGenre', searchByGenre);

app.post('/searchDatabase/searchByRating', searchByRating);

app.get('/addCapitalCities/:country', addCapitalCities);


// display some information on the home page to get the user started
app.get('/home', function (req, res) {
    res.send(
        '<h2>tv show database app (put in some nav links for home page)</h2>'
    )
});

// redirect all urls entered that are not /country/{country name} to /home
app.get('/*', function (req, res) {
    res.redirect('/home')
});

// set port for web page to be locally hosted on 
app.listen(8080, () => {
    console.log("server is running!"); // is called when connects
    utils.init();
});

