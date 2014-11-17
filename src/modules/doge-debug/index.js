var debug = require('doge-debug');

module.exports = angular.module('doge-debug', [])
	.factory('debug', function() {
    return debug;
  	});