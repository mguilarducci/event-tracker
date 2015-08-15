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
}

module.exports = Tracker;
