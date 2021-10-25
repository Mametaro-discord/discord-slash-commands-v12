'use strict';

const BaseInteraction = require('./BaseInteraction');
const ExtendedWebhookClient = require('../structures/ExtendedWebhookClient');

class CommandInteraction extends BaseInteraction {
	/**
	 * @param {Client}
	 * @param {InteractionData}
	 */
	constructor(client, data) {
		super(client, data);
		/**
		 * @type {Snowflake}
		 */
		this.commandId = data.data.id;
		/**
		 * @type {string}
		 */
		this.commandName = data.data.name;
		/**
		 * @type {boolean}
		 */
		this.deferred = this.reply.deferred;
		/**
		 * @type {boolean}
		 */
		this.replied = this.reply.replied;
		/**
		 * @type {boolean}
		 */
		this.isEphemeral = this.reply.isEphemeral;
	};
	/**
	 * @return {ApplicationCommand}
	 */
	get command() {
		return (this.guild || client).commands.cache.get(this.commandId) || null;
	};
};

module.exports = CommandInteraction;