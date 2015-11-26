/*
** GitHub API - Octonode
** at triadiprabowo.xyz
** Developed by Triadi Prabowo
*/

// Core Module(s)
var github = require('octonode'),
	express = require('express');

// Client Module(s)
var client = github.client('a38d11818d881b785e60881777aee8c3f62d30b2'),
	ghuser = client.user('triadiprabowo'),
	ghme = client.me();

module.exports = (function() {

	var gitRouter = express.Router();

	// GET: user info, repositories info and self info
	gitRouter.get('/api/github/user', function(req, res) {
		client.get('/user', {}, function(err, status, body) {
			res.status(200).json(body);
		});
	});

	gitRouter.get('/api/github/repo/:name/info', function(req, res) {
		var ghrepo = client.repo('triadiprabowo/'+req.params.name);

		ghrepo.info(function(err, body, headers) {
			res.status(200).json(body);
		});
	});

	gitRouter.get('/api/github/repo/:name/commit', function(req, res) {
		var ghrepo = client.repo('triadiprabowo/'+req.params.name);

		ghrepo.commits(function(err, body, headers) {
			res.status(200).json(body);
		});
	});

	gitRouter.get('/api/github/me/repos', function(req, res) {
		ghme.repos(function(err, body, headers) {
			res.status(200).json(body);
		});
	});

	// END ::GET::

	return gitRouter;
})();

