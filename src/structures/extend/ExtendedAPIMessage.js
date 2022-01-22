'use strict';

const { APIMessage, MessageEmbed } = require('discord.js');

module.exports = class ExtendedAPIMessage extends APIMessage {
	/**
	 * @return {ExtendedAPIMessage}
	 */
	resolveData() {
		if (this.data) return this;

		super.resolveData();

		if (this.options.ephemeral) this.data.flags = 1 << 6;

		if (this.options.component) {};

		return this;
	}
}