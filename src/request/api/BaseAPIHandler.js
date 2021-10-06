'use strict';

const Base = require('../../Classes/Base.js');

/**
 * @extends (Base)
 */
class BaseAPIHandler extends Base {
	/**
	 * @param (Client) client from discord.js
	 * @optional (Snowflake) guildId
	 */
	constructor(client, guildId) {
		super(client);

		this.guildId = guildId;

		let inGuild;
		if (guildId) {
			inGuild = true;
		} else {
			inGuild = false;
		};
		this.inGuild = inGuild;
	};
};

module.exports = BaseAPIHandler;