'use strict';

const Base = require('./Base.js');

/**
 * @extends (Base)
 */
class BaseManager extends Base {
	/**
	 * @param (Client) from discord.js
	 * @param (Snowflake) 
	 */
	constructor(client, guildId) {
		super(client);

		Object.defineProperty(this, 'guildId', {
			value: guildId
		});
	};
};

module.exports = BaseManager;