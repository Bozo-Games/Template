"use strict";
const assert = require('assert');
const routes = require('../../server/socketIORoutes/routes.js');
describe('Server/socketIORoute/routes.js', function () {
	it('should exist', function() {
		assert.ok(routes !== undefined)
	});
	it('should have inbound property', function () {
		assert.ok(routes.inbound !== undefined);
	});
	it('should have outbound property', function () {
		assert.ok(routes.outbound !== undefined);
	});
	it('inbound should have debug function', function () {
		assert.ok(routes.inbound.debug !== undefined);
		assert.ok(typeof routes.inbound.debug  === 'function');
	});
});