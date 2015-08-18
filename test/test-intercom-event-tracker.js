'use strict';

var expect = require('chai').expect,
	// Tracker = require('../lib/event-tracker.js'),
	IntercomTracker = require('../lib/trackers/intercom-tracker.js');

describe('Intercom tracker', function() {
	var options = {
			appId: 'appId',
			appTestId: 'appTestId',
			secretKey: 'secretKey',
			apiKey: 'api-key'
		},
		intercom = new IntercomTracker(options);

	it('should be named intercom', function(done) {
		expect(intercom.name).to.equal('intercom');
		done();
	});

	it('should set correct options', function(done) {
		expect(intercom._options).to.equal(options);
		done();
	});

	describe('#getIdentifiers', function() {
		var optionsUser = {
			userId: 'userId',
			email: 'email@email.com'
		};

		it('should return an object', function(done) {
			expect(intercom.getIdentifiers(optionsUser)).to.be.an('object');
			done();
		});

		it('should return "user_id", "email" and "user_hash"', function(done) {
			var identifiers = intercom.getIdentifiers(optionsUser);

			expect(identifiers).to.have.all.keys('user_id',
				'email', 'user_hash');
			done();
		});

		it('should return correct "user_hash"', function(done) {
			var crypto = require('crypto'),
				identifiers = intercom.getIdentifiers(optionsUser),
				hash = crypto.createHmac('sha256', options.secretKey)
					.update(optionsUser.userId).digest('hex');

			expect(identifiers.user_hash).to.be.equal(hash);
			done();
		});

		it('should have valid options', function(done) {
			expect(function() {
				intercom.getIdentifiers({});
			}).to.throw(Error);
			done();
		});
	});
});
