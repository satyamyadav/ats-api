var app = module.exports = require('express')();
var Promise = require('bluebird');
var _ = require('lodash');
var filters = appRequire('util/filters');
var fake = appRequire('util/fake');


app.get('/', (req, res) => {

  var users = fake.users();

  res.view('users/list', users);
});
