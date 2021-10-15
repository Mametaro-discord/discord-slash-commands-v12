'use strict';

const Base = require('./Base.js');
const { APIMessage } = require('discord.js');

/**
 * @extends (Base)
 */
class Followup extends Base {
	/**
	 * @param (Client)
	 * @param (ExtendedWebhookClient)
	 */
	constructor(client, interaction, webhook) {
		super(client);

		this.interaction = interaction;

		this.webhook = webhook;

		this.isEphemeral = false;
	};
	/**
	 * @param (content, options)
	 * @return (Message)
	 */
	async send(content, options) {
		await this.webhook.sendMessage(content, options);
		return this;
	};
	/**
	 * @param (string)
	 * @param (object)
	 * @return (Followup)
	 */
	async edit(content, options) {
		await this.webhook.editMessage(content, options);
		return this;
	};
	/**
	 * @param (Snowflake)
	 * @return (true)
	 */
	async delete(id) {
		await this.webhook.deleteMessage(id);
		return true;
	};
	/**
	 * @param (Snowflake)
	 * @return (true)
	 */
	async fetch(id) {
		return await this.webhook.fetchMessage(id);
	};
};

module.exports = Followup;