'use strict';

var crypto = require('crypto'),
	helper = require('../helper.js');

function IntercomTracker(options) {
	this.name = 'intercom';
	this._options = options || {};

	return this;
}

IntercomTracker.prototype.getIdentifiers = function(options) {
	if (!options) {
		throw new Error('Invalid arguments');
	}

	if (!options.userId || !options.email) {
		throw new Error('Must have email and userId options');
	}

	if (!this._options.secretKey) {
		throw new Error('Must have secretKey for secure mode');
	}

	var result = helper.keyMap(keyMap, options);

	// jshint camelcase: false
	// jscs:disable
	result.user_hash = crypto.createHmac('sha256', this._options.secretKey)
		.update(options.userId).digest('hex');

	return result;
};

/****** private *****/
var keyMap = {
	userId: 'user_id',
	email: 'email'
};

module.exports = IntercomTracker;
