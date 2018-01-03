let frameCount = 0;
const assert = require('assert');
const Animation = require('../server/StateMachines/AnimationFSM.js');
const Client = require('../server/StateMachines/ClientFSM.js');
describe('Client', function () {
	it('should exist', function() {
		assert.ok(Client !== undefined)
	});
	it('should be functional', function () {
		let a = {};
		Client.initialize(a);
		let st = (new Date()).getTime();
		Client.loadJSON(a,{test:'test'});
		setTimeout(function () {
			Client.loadJSON(a,{test:'test 2'});
			Client.loadJSON(a,{test:'test 3'});
		},1000);
		this.timeout(50000);
		/*
		while( (new Date()).getTime() <  st + 2000) {
			let ad = Animation.animationData(a);
			//console.log(`(${ad.x},${ad.y})`);
		}*/
	});
});