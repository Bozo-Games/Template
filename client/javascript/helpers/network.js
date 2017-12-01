"use strict";
let socket = io();
socket.on('debug', function(msg){ //will log the debug msg on client side
	console.log(msg);
});
//used to make socket io call with server
let NETWORK = {
	debug: function(msg) { //will log the debug msg on the server side
		socket.emit('debug',msg);
	}
};