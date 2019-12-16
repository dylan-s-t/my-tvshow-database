const MongoClient = require('mongodb').MongoClient;

var _db = null;

var uri = "mongodb+srv://dbUser:hBYvon2SasVuuBlm@cluster0-jkgzf.gcp.mongodb.net/test?retryWrites=true&w=majority";

const init = function (callback) {
    MongoClient.connect(uri,(err, client) => {
        if (err) {
            return console.log('unable to connect to db'+err);
            
        }
        _db = client.db('test');
        console.log("successfully connected to the mongodb cluster")
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