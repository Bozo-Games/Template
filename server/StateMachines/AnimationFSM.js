const machina = require('machina');
const helpers = require('../helpers.js');
function validateAnimationFrame(frameData, refrence = {x:0,y:0,w:1,h:1,t:0,loop:'idle',frame:0,mode:{x:'p',y:'p',w:'r',h:'r',t:'l',loop:'c'}} ) {
	//mode options
	// p - relative to parent
	// g - relative to global
	// f - a fixed value relative to global
	// r - relative to starting Value

	//timing modes
	// l - linear

	//animation loops
	// c - cycling
	// f - one way fixed
	if(frameData === undefined) {
		frameData = refrence;
	} else {
		frameData.x = frameData.x === undefined ? refrence.x : frameData.x;
		frameData.y = frameData.y === undefined ? refrence.y : frameData.y;
		frameData.w = frameData.w === undefined ? refrence.w : frameData.w;
		frameData.h = frameData.h === undefined ? refrence.h : frameData.h;
		frameData.t = frameData.h === undefined ? refrence.t : frameData.t;
		frameData.loop = frameData.loop === undefined ? refrence.loop : frameData.loop;
		frameData.frame = frameData.frame === undefined ? refrence.frame : frameData.frame;

		if(frameData.mode === undefined) {
			frameData.mode = refrence.mode;
		} else {
			frameData.mode.x = frameData.mode.x === undefined ? refrence.mode.x : frameData.mode.x;
			frameData.mode.y = frameData.mode.y === undefined ? refrence.mode.y : frameData.mode.y;
			frameData.mode.w = frameData.mode.w === undefined ? refrence.mode.w : frameData.mode.w;
			frameData.mode.h = frameData.mode.h === undefined ? refrence.mode.h : frameData.mode.h;
			frameData.mode.t = frameData.mode.t === undefined ? refrence.mode.t : frameData.mode.t;
			frameData.mode.loop = frameData.mode.loop === undefined ? refrence.mode.loop : frameData.mode.loop;
		}
	}
	return frameData;
}

let AnimationFSM = new machina.BehavioralFsm({
	nameSpace: 'animation',
	initialState: 'uninitialized',
	states: {
		uninitialized: {
			"*": function( instance ) {
				instance.id = helpers.guid();
				this.deferUntilTransition( instance );
				this.transition(instance,"startFrame");
			}
		},
		startFrame: {
			_onEnter: function (instance) {
				instance.fromFrame = instance.startFrame;
				instance.toFrame = instance.endFrame;
				if(instance.keyFrames.length > 0) {
					instance.toFrame = instance.keyFrames[0];
				}
				instance.startEpoch = (new Date()).getTime();
				instance.timer = setTimeout(function () {
					this.handle(instance,'timeOut')
				}.bind(this),instance.startFrame.t);
			},
			forceEnd: 'endFrame',
			timeOut: 'keyFrame'
		},
		keyFrame: {
			_onEnter: function (instance) {
				if(instance.keyFrames.length > 0) {
					instance.fromFrame = instance.keyFrames[0];
					instance.startEpoch = (new Date()).getTime();
					instance.keyFrames.splice(0,1);
					instance.toFrame = instance.endFrame;
					if(instance.keyFrames.length > 0) {
						instance.toFrame = instance.keyFrames[0];
					}
					instance.timer = setTimeout(function () {
						this.handle(instance,'timeOut')
					}.bind(this),instance.fromFrame.t);
				} else {
					this.handle(instance,'timeOut');
				}
			},
			timeOut: function (instance) {
				clearTimeout(instance.timer);
				if(instance.keyFrames.length > 0) {
					this.handle(instance,'_onEnter');
				} else {
					this.handle(instance,'_endFrame');
				}
			},
			_endFrame: 'endFrame',
			forceEnd: function (instance) {
			},
		},
		endFrame: {
			_onEnter: function (instance) {
				clearTimeout(instance.timer);
				instance.fromFrame = instance.endFrame;
				instance.toFrame = instance.endFrame;
				this.emit('animationDone',{instance:instance});
			},
			forceEnd: function (instance) {
				this.emit('animationDone',{instance:instance});
			},

		},
	},
	//public methods
	initialize: function (instance,lastAnimation) {
		instance.startFrame = validateAnimationFrame(instance.startFrame,lastAnimation);
		instance.keyFrames = instance.keyFrames === undefined ? [] : instance.keyFrames;
		for(let i = 0; i < instance.keyFrames.length; i++) {
			let d = instance.startFrame;
			if(i > 0) {
				d = instance.keyFrames[i-1];//this keeps the values from the previous frame
			}
			instance.keyFrames[i] = validateAnimationFrame(instance.keyFrames[i],d);
		}
		let d = instance.startFrame;
		if(instance.keyFrames.length > 0) {
			d = instance.keyFrames[instance.keyFrames.length-1];//this keeps the values from the previous frame
		}
		instance.endFrame = validateAnimationFrame(instance.endFrame, d);
		this.handle(instance,'*');
	},
	animationData: function (instance) {
		let data = {};
		let p = 1;
		if(instance.fromFrame.t > 0) {
			//TODO calculate p based on time mode
			p = Math.max(0,Math.min(1,((new Date()).getTime() - instance.startEpoch) / instance.fromFrame.t));
		}
		//TODO change calulations based on modes
		for(let v of ['x','y','w','h']) {
			data[v] =  instance.fromFrame[v] * (1-p) + instance.toFrame[v] * (p);
		}
		data.loop = instance.fromFrame.loop;
		data.frame = Math.floor(instance.fromFrame.frame * p + instance.toFrame.frame * (1-p));
		if(instance.fromFrame.mode.loop === 'c') {
			if(typeof frameCount !== 'undefined') {
				data.frame += frameCount; //frame count is defined in sketch
			}
		}
		data.mode = instance.fromFrame.mode;
		return data;
	},
	forceEnd: function (instance) {
		this.handle(instance,'forceEnd');
	}
});

module.exports = AnimationFSM;