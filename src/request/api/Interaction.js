'use strict';

const Base = require('../../Base.js');
const GetEndpoints = require('../endpoints/index.js');
const fetch = require('node-fetch');

class Interaction extends Base {
	/**
	 * @param (interactionId)
	 * @param (interactionToken)
	 */
	constructor(client, id, token) {
		super(client);
		const options = {
			interactionId: id,
			interactionToken: token
		};
		this.endpoints = new GetEndpoints(client, options).interaction;
		Object.defineProperties(this, {
			id: {
				value: id
			},
			token: {
				value: token
			}
		});
		this.headers = {
			'Authorization': `Bot ${client.token}`,
			'Content-Type': 'application/json'
		};
	};
	/**
	 * @param (InteractionResponse) from interface.ts
	 * @return ()
	 */
	create(bodySource) {
		const json = await fetch(this.endpoints.create, {
			method: 'post',
			body: JSON.stringify(bodySource),
			headers: this.headers
		}).then(res => res.json());
		return json;
	};
};

module.exports = Interaction;