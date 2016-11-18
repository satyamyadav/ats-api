var app = module.exports = require('express')();

var _ = require('lodash');
var Promise = require('bluebird');

function initResolved(req) {
    req.resolved = _.isUndefined(req.resolved) ? {} : req.resolved;
};

var filters = module.exports = {
  validAuthHeader: function (req, res, next) {
        // Filter which can be placed on public route
        // if authorization headers contain valid token
        // set user in in req.user
        if (req.headers && req.headers.authorization) {
            var parts = req.headers.authorization.split(' ');
            if (parts.length == 2) {
                var scheme = parts[0],
                    credentials = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
                    orm.cache.get(token)
                        .then(function (userId) {
                            db('users').find('id', userId).
                            then(function (user) {
                                req.user = user;
                                next();
                            });
                        });
                }
            } else {
                next();
            }
        } else {
            next();
        }
    }
};
