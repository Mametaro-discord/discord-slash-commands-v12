'use strict';

function main(client, options = {}) {
	const { jsonSource, commandId } = options;
	const endpoints = {
		get: {
			method: 'get',
			url: `commands/${commandId}`,
			bodyNeed: false
		},
		getAll: {
			method: 'get',
			url: `commands`,
			bodyNeed: false
		},
		create: {
			method: 'post',
			url: `commands`,
			bodyNeed: true
		},
		edit: {
			method: 'patch',
			url: `commands/${commandId}`,
			bodyNeed: true
		},
		delete: {
			method: 'delete',
			url: `commands/${commandId}`,
			bodyNeed: false
		},
		blukOverwrite: {
			method: 'put',
			url: `commands`,
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