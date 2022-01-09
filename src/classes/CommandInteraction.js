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
	};
	/**
	 * @type {ApplicationCommand}
	 * @readonly
	 */
	get command() {
		return (this.guild || client).commands.cache.get(this.commandId) || null;
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get deferred() {
		return this.reply.deferred;
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get ephemeral() {
		return this.reply.ephemeral;
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get replied() {
		return this.reply.replied;
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get isEphemeral() {
		return this.reply.isEphemeral;
	}
};

module.exports = CommandInteraction;