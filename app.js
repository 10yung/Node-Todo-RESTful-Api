var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./driver/mongodb');
var setupController = require('./controller/setupController');
var apiController = require('./controller/apiController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static('public'));

app.set('view engine','ejs');

mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);

app.listen(port);
