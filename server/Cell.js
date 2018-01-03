const machina = require('machina');
const helpers = require('./helpers.js');
const CellFSM = new machina.BehavioralFsm({
	initialize: function (options) {
		
	},
	namespace: 'cell',
	initialState: "uninitialized",

	states: {
		uninitialized: {
			"*": function (instance) {
				console.log(instance.name + ' init');
				this.deferUntilTransition(instance);
				this.transition(instance, "blank");
			}
		},
		blank: {
			selectX: function (instance) {
				console.log(instance.name + ' has selected X');
				this.transition( instance, "x" );
			},
			selectO: function (instance) {
				console.log(instance.name + ' has selected O');
				this.transition( instance, "o" );
			},
		},
		x: {

		},
		o: {

		}
	}, //end states
	selectX: function (instance) {
		this.handle(instance,'selectX');
	},
	selectO: function (instance) {
		this.handle(instance,'selectO');
	},
	init:function (instance) {
		this.handle(instance,'*')
	}
});
class Cell {
	constructor(json) {
		json = json === undefined ? {} : json;
		helpers.checkJSONValue(this,json,'name',['name'],'no Name');

		CellFSM.init(this);
	}
	selectX() {
		CellFSM.selectX(this);
	}
	selectO(){
		CellFSM.selectO(this);
	}
	get currentState() {
		return CellFSM.compositeState(this);
	}
}
module.exports = Cell;