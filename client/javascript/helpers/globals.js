let machina;
let Cell;
let Animation;
let Client;


//TODO figure out where these functions should go
function checkJSONValue(that,json,name,possibleNames,defaultValue) {
	let subJSONKey;
	let subJSON;
	let subValue;
	for(let checkName of possibleNames) {
		let names = checkName.split('.');
		let i = 0;
		subJSONKey = names[i];
		subValue = json[subJSONKey];
		while(subValue !== undefined && i < names.length) {
			if(i !== 0) {
				subJSONKey = names[i];
				subValue = subValue[subJSONKey];
			}
			i++;
		}
		if(subValue !== undefined) {
			break;
		}
	}
	let i = 0;
	let names = name.split('.');
	for(let subName of names) {
		if(that[subName] === undefined) {
			that[subName] = {};
			if(i === names.length-1) {
				that[subName] = subValue !== undefined ? subValue : defaultValue;
			}
		}
		i++;
		that = that[subName];
	}
}

Array.prototype.inArray = function(comparer) {
	for(var i=0; i < this.length; i++) {
		if(comparer(this[i])) return true;
	}
	return false;
};

// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function(element, comparer) {
	if (!this.inArray(comparer)) {
		this.push(element);
	}
};
Array.prototype.move = function (from, to) {
	this.splice(to, 0, this.splice(from, 1)[0]);
};
