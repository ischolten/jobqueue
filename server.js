var express = require('express');
var app = express();
var port = process.env.Port || 3000;
var mongoose = require('mongoose');
var Task = require('./api/models/jobqueueModel');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Jobqueuedb');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var routes = require('./api/routes/jobqueueRoutes');
routes(app);

app.listen(port);

console.log('job queue rest api server started on:' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
