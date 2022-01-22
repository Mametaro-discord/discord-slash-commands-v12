exports.entries2Object = function(entries) {
	let result;
	entries.forEach([key, value] => result[key] = value);
	return result;
};