'use strict';

var expect = require('chai').expect,
	helper = require('../lib/helper.js');

describe('helper', function() {
	describe('#keyMap', function() {
		var keyMap = {
				userId: 'user_id',
				email: 'email'
			},
			values = {
				userId: 'userId value',
				email: 'email@email.com',
				other: 'other value'
			};

		it('should return correct keys', function(done) {
			var result = helper.keyMap(keyMap, values);

			expect(result.user_id).to.be.equal(values.userId);
			expect(result.email).to.be.equal(values.email);
			expect(result.other).to.be.equal(values.other);
			done();
		});
	});
});
