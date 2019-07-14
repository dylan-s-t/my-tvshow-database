const MongoClient = require('mongodb').MongoClient;

var _db = null;

const init = function (callback) {
    MongoClient.connect('mongodb://localhost:27017/test', (err, client) => {
        if (err) {
            return console.log('unable to connect to db');
        }
        _db = client.db('test');
        console.log("successfully connected to the mongodb folder")
    });
};

const getDb = function() {
    return _db;
}
// in app.js, we want to listen to the port

// exports two functions
// init runs function
// getDb allows access?

module.exports = {
    init,
    getDb
}