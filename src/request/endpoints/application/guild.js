'use strict';

function main(client, options = {}) {
	const { commandId, guildId } = options;
	const endpoints = {
		get: `commands/${commandId}`,
		getAll: `commands`,
		create: `commands`,
		edit: `commands/${commandId}`,
		delete: `commands/${commandId}`,
		blukOverwrite: `commands`,
		permissions: {
			get: `commands/${commandId}/permissions`,
			getAll: `commands/permissions`,
			edit: `commands/${commandId}/permissions`,
			batchEdit: `commands/permissions`
		}
	};
	for (let k in endpoints) {
		endpoints[k] = `https://discord.com/api/v8/applications/${client.user.id}/guilds/${guildId}/` + endpoints[k].url;
		endpoints[k].client = client;
	};
	return endpoints;
};
module.exports = main;