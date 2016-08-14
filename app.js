var express = require('express');
var app = express();
var mongoose = require('mongoose');
var driver = require('./driver/mongodb');
var config = require('./config/config.json');
var setupController = require('./controller/setupController');
var apiController = require('./controller/apiController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static('public'));

app.set('view engine', 'ejs');
app.set('superSecret', config.local.secret);

mongoose.connect(driver.getLocalDbConnectionString());
setupController(app);
apiController(app);

app.listen(port);
