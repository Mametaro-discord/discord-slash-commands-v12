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
	 * @return (GuildApplication|GlobalApplication)
	 */
	applications() {
		if (this.inGuild) {
			return new GuildApplication(this.client);
		} else {
			return new GlobalApplication(this.client);
		};
	};
	/**
	 * @param (Client) from discord.js
	 * @param (Snowflake) id of interaction
	 * @param (string) token of interaction
	 * @return (Interaction)
	 */
	interactions(id, token) {
		new Interaction(this.client, id, token);
	};
	/**
	 * @param (Client) from discord.js
	 * @param (Snowflake) id of webhook
	 * @param (string) token of webhook
	 * @return (Webhook) 
	 */
	webhooks(id, token) {
		new Webhook(this.client, id, token);
	};
};