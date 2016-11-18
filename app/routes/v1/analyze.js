var app = module.exports = require('express')();
var Promise = require('bluebird');
var _ = require('lodash');
var filters = appRequire('util/filters');
var fake = appRequire('util/fake');
var data = appRequire('util/data');
var request = require('request');

app.get('/:github', (req, res) => {

    var data = {};
    var username = 'krishnaxv';

    github.repos.getForUser({
        username: username,
        per_page: 999

    }).then(function(response) {
        console.log('edhar res');
        var props = [];
        var languages = [];
        var self_projects = [];
        var forked_projects = [];
        var total_commits = [];
        response.forEach(function(key, index, array) {
            var projectObject = {};

            if (key.language !== null && !key.fork) {
                languages.push(key.language)
            }

            if (key.fork) {
                forked_projects.push(key);
            } else {
                self_projects.push(key);
            }

            var tc = github.repos.getCommits({
                owner: username,
                repo: key.name
            }).then(function(d) {
                return d;
            })

            props.push(tc);

        });

        Promise.all(props).then(function(resp) {
            data['languages'] = _.countBy(languages);
            data['self_projects'] = self_projects;
            data['forked_projects'] = forked_projects;
            data['commits'] = resp;
            res.send(data);
        })
    })

});
