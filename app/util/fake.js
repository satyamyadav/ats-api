var app = module.exports = require('express')();

var range = appRequire('util/range');
var uuid = require('uuid');
var _ = require('lodash');
var Promise = require('bluebird');
var faker = require('faker');


function buildUser() {
  return {
    username      : faker.internet.userName(),
    email         : faker.internet.email(),
    full_name     : faker.name.firstName() + ' ' + faker.name.lastName(),
    social_accounts:{ "facebook_id": uuid(),
               "twitter_id": uuid(),
              "googleplus_id" : uuid()
            },
    user_location : {"lat": 33.33, "lng": 77.61},
    details       : {
      age   :faker.helpers.randomNumber(19, 60),
      gender: 'M' ,
    },
    imported_data : faker.helpers.contextualCard(),
    picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/kimcool/128.jpg'
  }
}


var fake = module.exports = {

  users: function(){
    return [buildUser()]
  }


}
