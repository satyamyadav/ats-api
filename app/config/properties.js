var path = function(path) {
  return require('path').normalize(__dirname + '/../..' + path);
};
var package = require(path('/package.json'));

module.exports = {
  path: path,

  name: package.name,

  api: {
    defaultVersion: 'v1',
    versions: ['v1']
  },
  serviceApi: {
    development: {
      baseUrl: 'http://localhost:3030'
    },
    production: {
      baseUrl: 'http://localhost:3000'
    }
  },
  server: {
    port: process.env.PORT || 3030,
    uploadsDir: path('/storage/uploads'),
    publicDir: path('/public')
  },

  redis: {
    development: {
      host: '0.0.0.0',
      port: '6379',
      dbCachePrefix: '_div.cache'
    },
    production: {
      host: 'localhost',
      port: '6379',
      dbCachePrefix: '_div.cache'

    },
    staging: {
      host: 'localhost',
      port: '6379',
      dbCachePrefix: '_div.cache'
    }
  }

};
