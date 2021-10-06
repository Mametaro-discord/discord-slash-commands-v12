'use strict';

const fetch = require('node-fetch');

async function main(options = {}) {
	const { method, url, client, body } = options;
	const headers = {
		'Authorization': `Bot ${client.token}`,
		'Content-Type': 'application/json'
	};
	let fetchOption = {
		method: method,
		headers: header
	};
	if (body) {
		fetchOption.body = body;
	};
	const json = await fetch(url, fetchOption)
};

module.exports = main;