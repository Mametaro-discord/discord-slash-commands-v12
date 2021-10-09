const botId = '890895028350767124';
const botToken = 'ODkwODk1MDI4MzUwNzY3MTI0.YU2cpg.0qsq_BIK4RBbySv3kyQObjUdIVc';
const iaId = '896411222587617300';
const iaToken = 'aW50ZXJhY3Rpb246ODk2NDExMjIyNTg3NjE3MzAwOm01RDVtY1RidTJKVUlpOWRmTDNLbjVkTkQ4NkhKcWZVYVZmakx5Nm9JdHN4eGlKTWM1aFczZ29GUG5VaTV4T3o0SHJKam1SNkZMVGx4d0xLQ3RlYWFEaEJLNXBxUDlQSmRveEV4MU1Jb3BFcUlyR1dROVJ5V0gybzJrbjJjcm1O';
const fetch = require('node-fetch');
const endpoint = `https://discord.com/api/v8/webhooks/${botId}/${iaToken}/messages/@original`;
const data = {
	type: 4,
	data: {
		content: 'STRING'
	}
};

async function main() {
	const json = await fetch(endpoint, {
		method: 'get',
		headers: {
			'Authorization': `Bot ${botToken}`,
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());
	console.log(json);
};
main();