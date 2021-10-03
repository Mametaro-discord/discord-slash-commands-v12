const fetch = require('node-fetch');
const endpoint = 'https://discord.com/api/v8/applications/890895028350767124/commands';
const token = 'ODkwODk1MDI4MzUwNzY3MTI0.YU2cpg.SmOUHpnesrBU_mLuzIZPe5IgLm4';
const data = {
}

async function main() {
	const json = await fetch(endpoint, {
		method: 'get',
		headers: {
			'Authorization': `Bot ${token}`,
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());
	console.log(json);
};
main();