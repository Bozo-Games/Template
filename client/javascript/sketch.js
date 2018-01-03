let network;
let s;
let s2;
let c;
function setup() {
  // put setup code here
	createCanvas(400,400);
	s = new Sprite();
	s.animation = getDebugAnimation();
	s2 = new Sprite({x:width/2,y:height/2});
	let s3 = new Sprite({w:20,h:20,parentSprite:s2,color:'#ff0'});

}

function draw() {
	background('#444');

	s.draw();
	s2.draw();
}

function getDebugAnimation() {
	return {
		startFrame:{t:500},
		keyFrames:[
			{x:100,t:500},
			{x:100,y:100,t:1000},
			{w:2,h:3,t:1000},
			{w:1,h:1,t:1000},
			{x:0,y:0,t:500},]};
}
function mouseReleased() {
	s2.loadJSON({test:'test'});
	//s2.animation = getDebugAnimation();
}





