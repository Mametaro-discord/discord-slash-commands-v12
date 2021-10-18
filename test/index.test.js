class Main {
	static async afn(content) {
		return content
	};
};

let input;
async function main() {
	input = (Main
		? (await Main)
		: null
		).afn(100);
};
main();

console.log(input);