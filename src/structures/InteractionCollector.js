'use strict';

const { Collection, Collector } = require('discord.js');
const {
	InteractionTypes,
	MessageComponentTypes
} = require('../interfaces/consts');

module.exports = class InteractionCollector extends Collector {
	/**
	 * @param {Client}
	 * @param {Function}
	 * @param {InteractionCollectorOptions} @optional
	 */
	constructor(client, filter, options = {}) {
		super(client, filter, options);
		/**
		 * @type {?Snowflake}
		 */
		this.messageId = (options.message && options.message.id) || null;
		/**
		 * @type {?Snowflake}
		 */
		this.channelId = this.client.channels.resolveId(options.message && options.message.channel) ||
			(options.message && options.message.channel_id) ||
			this.client.channels.resolveId(options.channel) || null;
		/**
		 * @type {?Snowflake}
		 */
		this.guildId = this.client.guilds.resolveId(options.message && options.message.guild) ||
			(options.message && options.message.guildId) ||
			this.client.guilds.resolveId(options.channel && options.channel.guild_id) || 
			this.client.guilds.resolveId(options.guild) || null;
		/**
		 * @type {?InteractionType}
		 */
		this.interactionType = typeof options.interactionType === 'string'
			? options.interactionType
			: InteractionTypes[options.interactionType] || null;
		/**
		 * @type {?MessageComponentType}
		 */
		this.componentType = typeof options.componentType === 'string'
			? options.componentType
			: MessageComponentTypes[options.componentType] || null;
		/**
		 * @type {Collection}
		 */
		this.users = new Collection();
		/**
		 * @type {number}
		 */
		this.total = 0;

		this.empty = this.empty.bind(this);
		this.client.incrementMaxListeners();
		/**
		 * @param {Collection<APIMessage | Message>}
		 * @return {undefined}
		 */
		function handlerMessageBlukDeletion(messages) {
			if (messages.has(this.messageId)) this.stop('messageDelete');
		};

		if (this.messageId) {
			this.client.on('messageDelete', this.handleMessageDeletion.bind(this));
			this.client.on('messageBulkDelete', handlerMessageBlukDeletion);
		};

		if (this.channelId) {
			this.client.on('channelDelete', this.handleChannelDeletion.bind(this));
		};

		if (this.guildId) {
			this.client.on('guildDelete', this.handleGuildDeletion.bind(this));
		};

		this.client.on('interactionCreate', this.handleCollect.bind(this));

		this.once('end', () => {
			this.client.removeListener('messageDelete', this.handleMessageDeletion.bind(this));
			this.client.removeListener('messageBlukDelete', handlerMessageBlukDeletion);
			this.client.removeListener('channelDelete', this.handleChannelDeletion.bind(this));
			this.client.removeListener('guildDelete', this.handleGuildDeletion.bind(this));
			this.client.removeListener('interactionCreate', this.handleCollect.bind(this));
		});

		this.on('collect', async interaction => {
			this.total ++;
			if (!interaction.author.user) await interaction.author.fetch();
			this.users.set(interaction.author.user.id, interaction.author.user);
		});
	};
	/**
	 * @type {?string}
	 * @readonly
	 */
	get endReason() {
    	if (this.options.max && this.total >= this.options.max) return 'limit';
    	if (this.options.maxComponents && this.collected.size >= this.options.maxComponents) return 'componentLimit';
    	if (this.options.maxUsers && this.users.size >= this.options.maxUsers) return 'userLimit';
    	return null;
  	};
	/**
	 * @param {Interaction}
	 * @return {?Snowflake}
	 */
	collect(interaction) {
		const f = Boolean(
				(this.interactionType && this.interactionType !== interaction.type) ||
				(this.componentType && this.componentType !== interaction.componentType) ||
				(this.messageId && this.message !== (interaction.message && interaction.message.id)) ||
				(this.channelId && this.channelId !== interaction.channelId) ||
				(this.guildId && this.guildId !== interaction.guildId)
			);
		if (f) return null;

		return interaction.id;
	};
	/**
	 * @param {Interaction}
	 * @return {?Snowflake}
	 */
	dispose(interaction) {
		const f = Boolean(
				(this.interactionType && this.interactionType !== interaction.type) ||
				(this.componentType && this.componentType !== interaction.componentType) ||
				(this.messageId && this.message !== (interaction.message && interaction.message.id)) ||
				(this.channelId && this.channelId !== interaction.channelId) ||
				(this.guildId && this.guildId !== interaction.guildId)
			);
		if (f) return null;

		return interaction.id;
	};
	/**
	 * @return {undefined}
	 */
	end() {
		this.total = 0;
		this.collected.clear();
		this.users.clear();
		this.checkEnd();
	};
	/**
	 * @param {Message}
	 * @return {undefined}
	 */
	handleMessageDeletion(message) {
		if (message.id === this.messageId) this.stop('messageDelete');
	};
	/**
	 * @param {GuildChannel}
	 * @return {undefined}
	 */
	handleChannelDeletion(channel) {
		if (channel.id === this.channelId) this.stop('channelDelete');
	};
	/**
	 * @param {Guild}
	 * @return {undefined}
	 */
	handleGuildDeletion(guild) {
		if (guild.id === this.guildId) this.stop('guildDelete');
	};
};