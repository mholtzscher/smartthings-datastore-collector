var express = require('express');
var bodyParser = require('body-parser');
var events = require('./events.js');

var app = express();

var jsonParser = bodyParser.json();

var api_key_http_header = 'API_KEY';
var api_key = process.env.API_KEY;

// Check if api key is present.
if (!api_key) {
    var MISSING_API_KEY = [
        'Cannot find your api key. Please set an environment variable named ',
        '"', api_key_http_header, '"'
    ].join('');
    throw new Error(MISSING_API_KEY);
}

app.use(function apiValidation(req, res, next) {
    if (!req.get(api_key_http_header) || req.get(api_key_http_header) !== api_key) {
        res.sendStatus(403);
        return;
    }
    next();
});

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
