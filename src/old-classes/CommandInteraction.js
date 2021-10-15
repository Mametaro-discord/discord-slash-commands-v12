'use strict';

const BaseInteraction = require('./BaseInteraction.js');
const { deconstructor } = require('discord.js').SnowflakeUtil;

/**
 * @extends (BaseInteraction)
 */
class CommandInteraction extends BaseInteraction {
	/**
	 * @param (Client) from discord.js
	 * @param (object)
	 */
	constructor(client, data = {}) {
		super(client, data);
	};
	/**
	 * @return (boolean)
	 */
	get deferred() {
		return this.reply.deferred;
	};
	/**
	 * @return (boolean)
	 */
	get replied() {
		return this.reply.replied;
	};
	/**
	 * @return (boolean)
	 */
	get ephemeral() {
		return this.reply.ephemeral;
	};
	/**
	* @return (Command)
	 */
	get command() {
		return this.client.commands.get(this.commandId);
	};
	/**
	 * @return (number)
	 */
	get createdTimestamp() {
		return deconstructor(this.id).timestamp;
	};
	/**
	 * @return (Date)
	 */
	get createdDate() {
		return new Date(this.createdTimestamp);
	};
};

module.exports = CommandInteraction;