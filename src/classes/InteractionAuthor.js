'use strict';

const Base = require('./Base');

class InteractionAuthor {
	/**
	 * @param {Client}
	 * @param {BaseInteraction||CommandInteraction}
	 */
	constructor(client, interaction) {
		super(client);
		/**
		 * @return {BaseInteraction||CommandInteraction}
		 */
		this.interaction = interaction;
		/**
		 * @type {User}
		 */
		this.user = client.users.cache.get(interaction.userId);
		/**
		 * @type {GuildMember||null}
		 */
		this.member = interaction.guild.members.cache.get(interaction.userId) || null;
	};
	/**
	 * @return {InteractionAuthor}
	 */
	async fetch() {
		this.user = await this.client.users.fetch(this.interaction.userId);

		if (this.interaction.guild) {
			this.member = await this.interaction.guild.members.fetch(this.interaction.userId);
		};

		return this;
	};
};

module.exports = InteractionAuthor;