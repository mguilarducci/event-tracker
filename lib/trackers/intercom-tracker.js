'use strict';

var crypto = require('crypto'),
	helper = require('../helper.js'),
	Intercom = require('intercom.io');

function IntercomTracker(options) {
	this.name = 'intercom';
	this._options = options || {};
	this._intercom = new Intercom({
		apiKey: options.apiKey,
		appId: options.appId
	});
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

IntercomTracker.prototype.createEvent = function(eventName, data) {
	data = helper.keyMap(keyMap, data);
	data.event_name = eventName;
	data.created_at = Math.round((new Date()).getTime() / 1000 );
	this._intercom.createEvent(data).then(function(res) {
		console.log(res);
	}, function(err) {
		console.log(err);
	});
};

/****** private *****/
var keyMap = {
	userId: 'user_id',
	email: 'email',
	eventName: 'event_name',
	createdAt: 'created_at'
};

module.exports = IntercomTracker;
