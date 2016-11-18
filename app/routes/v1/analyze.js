var app = module.exports = require('express')();
var Promise = require('bluebird');
var _ = require('lodash');
var filters = appRequire('util/filters');
var fake = appRequire('util/fake');
var data = appRequire('util/data');
var request = require('request');

app.get('/:github', (req, res) => {

    var data = {};
    var username = 'ayusharma';

    github.repos.getForUser({
        username: username,
        per_page: 999

    }, function(err, response) {

        var languages = [];
        var self_projects = [];
        var forked_projects = [];
        var total_commits = 0;

        response.forEach(function(key) {
            var projectObject = {};

            if (key.language !== null && !key.fork) {
                languages.push(key.language)
            }

            if (key.fork) {
                forked_projects.push(key);
            } else {
                self_projects.push(key);
            }

            // github.repos.getCommits({
            //   owner:username,
            //   repo: key.name
            // }, function(err, resp) {
            //   total_commits = total_commits+resp.length;
            //   console.log('hello')
            // })
            //
            // data['total_commits'] = total_commits;

        });

        data['languages'] = _.countBy(languages);
        data['self_projects'] = self_projects;
        data['forked_projects'] = forked_projects;

        res.send(data);
    });

});
