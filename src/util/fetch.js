'use strict';

const fetch = require('node-fetch');

async function main(options = {}) {
	const { method, url, client, body } = options;
	const header = {
		'Authorization': `Bot ${client.token}`,
		'Content-Type': 'application/json'
	};
	let fetchOption = {
		method: method,
		header: header
	};
	if (body) {
		fetchOption.body = body;
	};
	const json = await fetch(url, fetchOption)
};

module.exports = main;