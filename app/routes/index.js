var app = module.exports = require('express')();
var _ = require('lodash');
var cors = require('cors');
var filters = appRequire('util/filters');
var validAuthHeader = filters.validAuthHeader;

var config = appRequire('config');


// setup cors
app.use(cors());

// load up request pagination params
app.use(function (req, res, next) {
    var order = req.query.order ? req.query.order : 'desc';
    var order_by = req.query.order_by ? req.query.order_by : 'id';
    var page = req.query.page ? req.query.page : 1;
    var per_page = req.query.per_page ? req.query.per_page : 20;
    var includes = req.query.includes;

    page = isNaN(page) ? 1 : Math.abs(parseInt(page));

    per_page = isNaN(per_page) ? 100 : Math.abs(parseInt(per_page));

    if (_.isArray(includes)) {
        includes = includes;
    } else if (_.isString(includes)) {
        includes = includes.split(',');
    } else {
        includes = []
    }

    req.query.page = page;
    req.query.per_page = per_page;
    req.query.order = order;
    req.query.order_by = order_by;
    req.query.includes = includes;

    var meta = {

        page : page,
        per_page : per_page,
        order : order,
        order_by : order_by,
        includes : includes
    };

    res.locals.meta = meta;

    next();
});

app.use(function (req, res, next) {
  res.err = function (code, msg) {
    res.status(code).send({error: {status: code, msg: msg}});
    throw msg;
    res.end();
  }
  next();
});

app.use(function (req, res, next) {
  res.info = function (msg) {
    res.status(200).send({info: {status: 200, msg: msg}});
    // throw msg;
    res.end();
  }
  next();
});


app.use(validAuthHeader);


// load up routes according to api version
var versionedApps = (function () {
    var apps = {};

    config('api.versions').forEach(function (v) {
        apps[v] = require('./'+v);
    });

    return apps;
}());

app.use(function (req, res, next) {
    var apiVersion = req.header('accept-version');

    if (config('api.versions').indexOf(apiVersion) === -1) {
        apiVersion = config('api.defaultVersion');
    }

    versionedApps[apiVersion](req, res, next);
});


app.get('/', function (req, res) {
    res.send({'msg': 'I am Javascript'});
});

// Global Not Found route
app.all('*', function (req, res) {
    // res.status(404).send({'msg': 'Not Found'});
    res.err(404, 'Not Found');
});
