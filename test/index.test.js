const array = [null, 'AAA', 'BBB'];

function generateEnum(arr) {
	let generated = {};
	arr.forEach((elm, idx) => {
		if (elm === null) return;
		generated[elm] = idx;
		generated[idx] = elm
	});
	return generated;
};

console.log(generateEnum(array));