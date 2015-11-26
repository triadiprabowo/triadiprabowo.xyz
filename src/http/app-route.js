/*
** Route List
** Host: triadiprabowo.xyz
** Developed by Triadi Prabowo
*/

// Mod Require
var express = require('express');

// Export Function Route Module
module.exports = (function(req, res) {
	'use strict';

	// Define Vars
	var router = express.Router();

	router.get('/', function(req, res) {
		res.render('index', {
			page: {
				description: 'Hello! My name is Triadi Prabowo and I am passionate web developer, eager to learn something new and using best methodologies and latest technologies to develop with.',
				title: 'Welcome to my XYZ'
			}
		});
	});

	router.get('/home', function(req, res) {
		res.render('index', {
			page: {
				description: 'Hello! My name is Triadi Prabowo and I am passionate web developer, eager to learn something new and using best methodologies and latest technologies to develop with.',
				title: 'Welcome to my XYZ'
			}
		});
	});

	router.get('/project', function(req, res) {
		res.render('project', {
			page: {
				description: 'Public personal project repositories, releases and in-development. Coded with latest technologies and methods',
				title: 'My Project XYZ'
			}
		});
	});

	return router;
})();