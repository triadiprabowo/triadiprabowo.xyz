/*
** GitHub API - Octonode
** at triadiprabowo.xyz
** Developed by Triadi Prabowo
*/

// Core Module(s)
var github = require('octonode'),
	express = require('express');

// Client Module(s)
var client = github.client('26046a8fd02d42a1e7843f40b2e3c70c4bb860c2'),
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

