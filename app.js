"use strict";
//load modules
let express = require('express')
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

//set Routes
app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/html/p5.html');
});
app.use( express.static('client')); //used to allow any file in client to be loaded by end user
//start the server
http.listen(3000, function(){
	console.log('listening on *:3000');
});

//Socket IO Routes handler
io.on('connection', function(socket) {
	console.log(socket.id + 'has connected');

	socket.on('debug',function (msg) {
		console.log('debug msg - '+msg);
	});
	socket.on('join game',function (data) {
		socket.emit('connected');
	});

});



