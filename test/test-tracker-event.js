'use strict';

var expect = require('chai').expect,
	Tracker = require('../lib/event-tracker.js');

describe('Tracker', function() {
	function SomeTracker() {
		this.name = 'some-tracker';
	}

	function OtherTracker() {
		this.name = 'other-tracker';
	}

	function InvalidTracker() {}

	describe('#use', function() {
		var tracker = new Tracker();

		it('should register new tracker', function(done) {
			tracker.use(new SomeTracker());
			expect(tracker._trackers['some-tracker']).to.be.an('object');
			done();
		});

		it('should not register tracker without a name', function(done) {
			expect(function() {
				tracker.use(new InvalidTracker())
			}).to.throw(Error);
			done();
		});
	});

	describe('#unuse', function() {
		var tracker = new Tracker();

		it('should unregister tracker', function(done) {
			tracker.use(new SomeTracker());
			tracker.use(new OtherTracker());

			tracker.unuse('some-tracker');
			expect(tracker._trackers['some-tracker']).to.be.undefined;
			expect(tracker._trackers['other-tracker']).to.be.an('object');
			done();
		});
	});
});
