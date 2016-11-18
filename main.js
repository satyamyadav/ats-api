require('fast-url-parser').replace();
require('./appRequire')();

var GitHubApi = require("github");

global.github = new GitHubApi({
    debug: true,
    protocol: "https",
    host: "api.github.com",
    pathPrefix: "",
    headers: {
        "Authorization": 'Basic YXl1c2hhcm1hOjJjZmIwMzFkNDljMmM0MjY1MjEwZGI4Y2YyNjkwOWY4MjUwOWRhY2I=' // GitHub is happy with a unique user agent
    },
    Promise: Promise,
    followRedirects: false,
    timeout: 5000000000
});

// So that JSON.stringify(date) doesn't fuck things up
Date.prototype.toJSON = Date.prototype.toString;


var config = appRequire('config');

// setup the server engine
appRequire('engine').setup(function(app) {

  // set up static file serving from node
  if (process.env.NODE_SERVE_STATIC === '1') {
    var publicDir = config('server.publicDir');
    app.use(require('serve-static')(publicDir));
  }

  // load up app routes
  app.use(appRequire('routes'));
});
