'use strict';

function main(client, options = {}) {
	const { guildId, commandId } = options;
	const endpoints = {
		get: {
			method: 'get',
			url: `commands/${commandId}`
		},
		getAll: {
			method: 'get',
			url: `commands`
		},
		create: {
			method: 'post',
			url: `commands`
		},
		edit: {
			method: 'patch',
			url: `commands/${commandId}`
		},
		
	}
}