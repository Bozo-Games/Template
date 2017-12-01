"use strict";
//load modules
let express = require('express')
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

//set Routes
app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/html/pt.html');
});
app.use( express.static('client')); //used to allow any file in client to be loaded by end user
//start the server
http.listen(3000, function(){
	console.log('listening on *:3000');
});