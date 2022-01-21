'use strict';

const Base = require('./Base');

module.exports = class InteractionAuthor extends Base {
	/**
	 * @param {Interaction}
	 */
	constructor(interaction) {
		super(interaction.client);
		/**
		 * @type {Interaction}
		 */
		this.interaction = interaction;
		/**
		 * @type {Snowflake}
		 */
		this.userId = interaction.userId;
		/**
		 * @type {User}
		 */
		this.user = client.users.cache.get(interaction.userId);
		/**
		 * @type {GuildMember}
		 */
		this.member = interaction.guild ? interaction.guild.members.cache.get(interaction.userId) : null;
	};
	/**
	 * @return {InteractionAuthor}
	 */
	async fetch() {
		this.user = await this.client.users.fetch(this.userId);
		this.member = 
			await this.interaction.guild ? this.interaction.guild.members.fetch(this.userId) : null;
		return this;
	};
};