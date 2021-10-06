'use strict';

function main(client, options = {}) {
	const { commandId } = options;
	const endpoints = {
		get: `commands/${commandId}`,
		getAll: `commands`,
		create: `commands`,
		edit: `commands/${commandId}`,
		delete: `commands/${commandId}`,
		blukOverwrite: `commands`
	};
	for (let k in endpoints) {
		endpoints[k] = `https://discord.com/api/v8/applications/${client.user.id}/` + endpoints[k];
	};
	return endpoints;
};
module.exports = main;