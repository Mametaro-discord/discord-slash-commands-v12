'use strict';

const Base = require('../../Classes/Base.js');
const getEndpoints = require('../endpoints/index.js');

/**
 * @extends (BaseApplication)
 */
class BaseApplication extends Base {
	/**
	 * @param (Client) client from discord.js
	 * @param (object) options
	 */
	constructor(client, options = {}) {
		super(client);

		Object.defineProperty(this, 'options', {
			value: options
		});

		this.endpoints = getEndpoints(client, options);

		this.header = {
			'Authorization': `Bot ${client.token}`,
			'Content-Type': 'application/json'
		};
	};
};