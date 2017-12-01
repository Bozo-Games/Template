/**
 * Used for sending msgs from the client and having the server print them out
 * @param msg - a string that should be logged on the server
 */
const debug = function (msg) {
	console.log(msg);
};

module.exports = debug;