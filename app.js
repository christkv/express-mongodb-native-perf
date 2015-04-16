var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/testdb';

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Connecting to db
MongoClient.connect(url, function(err, db){

  app.get('/api/todos', function (req, res) {
    var Model = db.collection('todos'),
    start     = process.hrtime();

    Model.aggregate([
        {$match: {}}
    ]).toArray(function(err, docs) {
      var diff = process.hrtime(start);
      console.log('Execution time (ms): ' + (diff[0] * 1e9 + diff[1])/1000000);
      res.send(docs);
    });
  });

  app.listen(3000);
});