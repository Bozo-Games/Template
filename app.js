"use strict";
//load modules
let express = require('express')
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

// set the view engine to ejs
app.set('view engine', 'ejs');
//set Routes
app.get('/', function(req, res){
	res.render(__dirname + '/client/html/p5.html.ejs',{params:req.query});
});
app.use( express.static('client')); //used to allow any file in client to be loaded by end user
//start the server
http.listen(3000, function(){
	console.log('listening on *:3000');
});
//get routes functions
const routes = require('./server/socketIORoutes/routes.js');
//Socket IO Routes handler
io.on('connection', function(socket) {
	let inboundKeys = Object.keys(routes.inbound); //grab all inbound names
	for(let i = 0; i < inboundKeys.length; i++) {  //look though names
		let key = inboundKeys[i];
		socket.on(key,routes.inbound[key]); //assign function associated with that name
	}
});