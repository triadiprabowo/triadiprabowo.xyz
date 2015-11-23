/*
** API Route List
** Host: triadiprabowo.xyz
** Developed by Triadi Prabowo
*/

// Mod Require
var express = require('express');
var validator = require('validator');
var emailJs = require('emailjs');

// Export Function Route Module
module.exports = (function(req, res) {
	'use strict';

	var server  = emailJs.server.connect({
		user:    "triadiprabowo@gmail.com", 
		password: "dtechboys", 
		host:    "smtp.gmail.com", 
		ssl:     true
	});

	var date = new Date();

	// Define Vars
	var router = express.Router();

	router.post('/api/email/post', function(req, res) {
		if(req.body.email == undefined || req.body.full_name == undefined || req.body.body == undefined) {
			res.status(400)
		}
		else if(!validator.isEmail(req.body.email)) {
			res.status(400).send('Invalid email address format');
		}
		else {
			server.send({
				from: req.body.email,
				to: 'Triadi Prabowo <triadiprabowo@gmail.com>',
				subject: 'Contact Inquiry Form ' + date,				
				attachment: [
					{data: '<html><p<b>Email:</b> '+req.body.email+'</p><p><b>Name:</b> '+req.body.full_name+'</p>'+'<p><b>Message:</b> '+req.body.body+'</p></html>', alternative: true}
				]
			}, function(err, msg) {
				if(!err) {
					res.status(200).json({
						status: 200,
						message: 'Successfully sent contact message!'
					});
				}
				else {
					res.status(501);
				}
			});			
		}
	});

	return router;
})();