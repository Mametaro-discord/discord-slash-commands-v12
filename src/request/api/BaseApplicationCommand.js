'use strict';

const Base = require('../../classes/Base.js');
const getEndpoints = require('../endpoints/index.js');

/**
 * @extends (BaseApplication)
 */
class BaseApplicationCommand extends Base {
	/**
	 * @param (Client) client from discord.js
	 * @param (object) options
	 */
	constructor(client, options = {}) {
		super(client);

		Object.defineProperty(this, 'options', {
			value: options
		});

		const endpoints = getEndpoints(client, options);
		this.endpoints = options.guildId ? endpoints.guild : endpoints.global;

		this.headers = {
			'Authorization': `Bot ${client.token}`,
			'Content-Type': 'application/json'
		};
	};
};

module.exports = BaseApplicationCommand;