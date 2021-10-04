'use strict';

function main(client, options = {}) {
	const { jsonSource, guildId, commandId } = options;
	const endpoints = {
		get: {
			method: 'get',
			url: `guilds/${guildId}/commands/${commandId}`,
			bodyNeed: false
		},
		getAll: {
			method: 'get',
			url: `guilds/${guildId}/commands`,
			bodyNeed: false
		},
		create: {
			method: 'post',
			url: `guilds/${guildId}/commands`,
			bodyNeed: true
		},
		edit: {
			method: 'patch',
			url: `guilds/${guildId}/commands/${commandId}`,
			bodyNeed: true
		},
		delete: {
			method: 'delete',
			url: `guilds/${guildId}/commands/${commandId}`,
			bodyNeed: false
		},
		blukOverwrite: {
			method: 'put',
			url: `guilds/${guildId}/commands`,
			bodyNeed: true
		}
	};
	for (let k in endpoints) {
		endpoints[k].url = `https://discord.com/api/v8/applications/${client.user.id}/` + endpoints[k].url;
		endpoints[k].client = client;
		if (endpoints[k].bodyNeed) {
			endpoints[k].body = JSON.stringify(jsonSource);
		};
		delete endpoints[k].bodyNeed;
	};
	return endpoints;
};
module.exports = main;