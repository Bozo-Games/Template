const helpers = require('./helpers.js');
const machina = require('machina');

const BoardFSM = new machina.BehavioralFsm({
	initialize: function (options) {

	},
	namespace: 'board',
	initialState: "uninitialized",

	states: {
		uninitialized: {
			"*": function (instance) {
				console.log('board init');
				this.deferUntilTransition(instance);
				this.transition(instance, "turnX");
			}
		},
		turnX: {
		},
		turnO: {
		},
		oWins: {
		},
		xWins: {
		},
		tie: {
		}
	}, //end states
	//public functions
	init:function (instance) {
		this.handle(instance,'*')
	},
	playerJoin: function (instance,player) {
		return new Promise((resolve, reject) => {
			if(instance.playerX !== undefined) {
				if(instance.playerO !== undefined) {
					reject('board is full');
				} else {
					instance.playerO = player;
					resolve(this.handle(instance,'playerJoin'))
				}
			} else {
				instance.playerX = player;
				resolve(this.handle(instance,'playerJoin'))
			}
		});
	},
	select: function (instance,player) {

	},
});


class Board {
	constructor(json) {
		json = json === undefined ? {} : json;
		this.playerX = undefined;
		this.playerO = undefined;
		BoardFSM.init(this);
	}
	get currentState() {
		return BoardFSM.compositeState(this);
	}
	playerJoin(player) {
		return BoardFSM.playerJoin(this,player);
	}
}

module.exports = Board;