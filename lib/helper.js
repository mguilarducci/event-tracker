'use strict';

var helper = {
	keyMap: function(keyMap, values) {
		var result = {},
			keys = Object.keys(values);

		keys.forEach(function(key) {
			if (keyMap[key]) {
				result[keyMap[key]] = values[key];
			} else {
				result[key] = values[key];
			}
		});

		return result;
	}
};

module.exports = Object.create(helper);
