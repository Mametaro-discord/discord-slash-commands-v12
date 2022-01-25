const invalid_date = new Date({});

try {
	console.log(invalid_date.toISOString());
} catch(e) {
	console.log('err')
}