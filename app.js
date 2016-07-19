var express = require('express');
var bodyParser = require('body-parser');
var events = require('./events.js');

var app = express();

var jsonParser = bodyParser.json()

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.post('/events', jsonParser, function(req, res) {
    events.insert(req.body);
    res.send('OK');
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Collector processing service is awake!');
});
