// var settings = require('../settings');
// var Db = require('mongodb').Db;
// var Connection = require('mongodb').Connection;
// var Server = require('mongodb').Server;

// module.exports=new Db(settings.db,new Server(settings.host,Connection.DEFAULT_PORT,{}));

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var settings = require('../settings');


module.exports = MongoClient.connect(settings.url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected correctly to server.');
});
