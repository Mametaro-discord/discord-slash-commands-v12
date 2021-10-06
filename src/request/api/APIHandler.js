'use strict';

const BaseAPIHandler = require('./BaseAPIHandler.js');
const GuildApplication = require('./GuildApplication.js');
const GlobalApplication = require('./GlobalApplication.js');

/**
 * @extends (Base)
 */
class APIHandler extends BaseAPIHandler {
	/**
	 * @param (Client) client from discord.js
	 * @optional (Snowflake) guildId
	 */
	constructor(client, guildId) {
		super(client, guildId);
	};
	/**
	 * @return (GlobalApplication)
	 */
	applications() {
		if (this.inGuild) {
			return new GuildApplication(this.client);
		} else {
			return new GlobalApplication(this.client);
		};
	};
};