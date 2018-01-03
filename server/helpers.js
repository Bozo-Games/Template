
const helpers =  {
	checkJSONValue: function(that,json,name,possibleNames,defaultValue) {
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
	},
	guid: function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4();
	}
};
module.exports = helpers;