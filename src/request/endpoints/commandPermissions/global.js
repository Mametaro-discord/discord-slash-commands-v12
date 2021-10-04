'use strict';

function main(client, options = {}) {
	const { guildId, commandId } = options;
	const endpoints = {
		get: {
			method: 'get',
			url: `guilds/${guildId}/commands/${commandId}/permissions`,
			bodyNeed: false
		},
		getAll: {
			method: 'get',
			url: `guilds/${guildId}/commands/permissions`,
			bodyNeed: false
		}
	}
}