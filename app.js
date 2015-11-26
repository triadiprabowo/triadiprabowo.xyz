/*
** Application NodeJS 1.0
** Hosted for triadiprabowo.xyz
** Personal Project
** Developed by Triadi Prabowo
*/

// Required Modules
var express = require('express'),
	jade = require('jade'),
	compression = require('compression'),
	router = require('./src/http/app-route'),
	api_router = require('./src/http/api-route'),
	bodyParser = require('body-parser'),
	ghAPI = require('./src/http/github-api'),
	app = express();

// Environment
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

// Middleware Application Configuration
app.set('views', './src/view');
app.set('view cache', true);
app.set('view engine', 'jade');

// Enable GZIP compression at max level
app.use(compression({
	level: 9
}));

// Configure Public Folder
app.use('/public', express.static('public'));

// URLEncoded parser
app.use(bodyParser.urlencoded({ 
	extended: false 
}));

// Configure Routing
app.use(router);
app.use(api_router);
app.use(ghAPI);

var server = app.listen(server_port, server_ip_address, function() {
	console.log('Running express server at '+server_ip_address+' on port '+server_port+'...');
});

