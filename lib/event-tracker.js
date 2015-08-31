'use strict';

function Tracker() {
	this._trackers = [];
	return this;
}

/**
 * Register a new tracker
 * @param {Tracker} tracker
 * @return {Tracker}
 */
Tracker.prototype.use = function(tracker) {
	if (!tracker || !tracker.name) {
		throw new Error('Tracker must have a name');
	}

	this._trackers[tracker.name] = tracker;
	return this;
};

/**
 * Unregister a tracker
 * @param {String} tracker
 * @return {Tracker}
 */
Tracker.prototype.unuse = function(trackerName) {
	delete this._trackers[trackerName];
	return this;
};

/**
 * Get user identifiers
 * @param {String} trackerName
 * @param {Object} options
 * @return {Object} identifiers
 */
Tracker.prototype.getIdentifiers = function(trackerName, options) {
	if (!trackerName || !this._trackers[trackerName]) {
		throw new Error('Tracker undefined');
	}

	return this._trackers[trackerName].getIdentifiers(options);
};

Tracker.prototype.createEvent = function(trackerName, eventName, data) {
	if (typeof eventName === 'object' && !data) {
		data = eventName;
		eventName = trackerName;

		for (var tracker in this._trackers) {
			this._trackers[tracker].createEvent(eventName, data);
		}
		return;
	}

	if (!trackerName || !this._trackers[trackerName]) {
		throw new Error('Tracker undefined');
	}

	this._trackers[trackerName].createEvent(eventName, data);
};

Tracker.prototype.createUser = function(trackerName, data) {
	if (typeof trackerName === 'object') {
		data = trackerName;

		for (var tracker in this._trackers) {
			this._trackers[tracker].createUser(data);
		}
		return;
	}

	if (!trackerName || !this._trackers[trackerName]) {
		throw new Error('Tracker undefined');
	}

	this._trackers[trackerName].createUser(data);
};

module.exports = Tracker;
