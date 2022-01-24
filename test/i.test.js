async function sub() {
	return 100;
};

function main() {
	return new Promise((resolve, reject) => resolve(sub()));
};

async function echo() {
	console.log(await main());
};

echo();