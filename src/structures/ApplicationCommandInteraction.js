'use strict';

const BaseInteraction = require('./BaseInteraction');
const ExtendedWebhookClient = require('./extend/ExtendedWebhookClient');
const InteractionFollowup = require('./InteractionFollowup');
const InteractionReply = require('./InteractionReply');
const {
	ApplicationCommandOptionTypes,
	ApplicationCommandTypes
} = require('../interfaces/consts');
const { Collection } = require('discord.js');

module.exports = class ApplicationCommandInteraction extends BaseInteraction {
	/**
	 * @param {Client}
	 * @param {APISlashCommandInteraction}
	 */
	constructor(client, data = {}) {
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
		 * @type {ApplicationCommandType}
		 */
		this.commandType = ApplicationCommandTypes[data.data.type];
		/**
		 * @type {ExtendedWebhookClient}
		 */
		this.webhook = new ExtendedWebhookClient(this.client, this.applicationId, this.token);
		/**
		 * @type {InteractionFollowup}
		 */
		this.followup = new InteractionFollowup(this.webhook);
		/**
		 * @type {InteractionReply}
		 */
		this.reply = new InteractionReply(this.client, this, this.webhook);
		/**
		 * @type {ApplicationCommandInteractionOption[]}
		 */
		this.options = {
			data: data.data.options
				.map(option => this.constructor.transformOption(option, data.data.resolved, true)),
			resolved: this.constructor.transformResolved(data.data.resolved)
		};
	};
	/**
	 * @type {?ApplicationCommand}
	 * @readonly
	 */
	get command() {
		return (this.guild || this.client).commands.cache.get(this.commandId) || null;
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
	get replied() {
		return this.reply.replied;
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
	get isEphemeral() {
		return this.reply.isEphemeral;
	};
	/**
	 * @param {APIApplicationCommandInteractionOption}
	 * @param {ApplicationCommandInteractionResolvedData}
	 * @param {boolean} @optional //Whether the option is received from API
	 * @return {ApplicationCommandInteractionOption}
	 */
	static transformOption(option, resolved, received) {
		let result = {
			name: option.name,
			type: received
				? typeof option.type === 'string' ? option.type : ApplicationCommandOptionTypes[option.type]
				: typeof option.type === 'number' ? option.type : ApplicationCommandOptionTypes[option.type]
		};

		if ('value' in option) result.value = option.value;
		if ('options' in option) 
			result.options = option.options.map(opt => this.transformOption(opt, resolved, true));
		if ('focused' in option) result.focused = option.focused;

		if (resolved) {
			const { value } = option, { users, members, roles, channels, messages } = resolved;
			if (users) {
				const user = users[value];
				if (user) result.user = this.client.users.add(user) || user;
			};
			if (members) {
				const member = members[value];
				if (member) result.member = this.guild 
					? this.guild.members.add({ user, ...member }) 
					: member;
			};
			if (roles) {
				const role = roles[value];
				if (role) result.role = this.guild 
					? this.guild.roles.add(role)
					: role;
			};
			if (channels) {
				const channel = channels[value];
				if (channel) result.channel = this.client.channels.add(channel, this.guild) || channel;
			};
			if (messages) {
				const message = messages[value];
				if (message) result.message = this.channel
					? this.channel.messages.add(message)
					: message
			};
		};

		return result;
	};
	/**
	 * @param {APIApplicationCommandInteractionResolved}
	 * @return {ApplicationCommandInteractionResolvedData}
	 */
	static transformResolved({ users, members, roles, channels, messages }) {
		return {
			users: Object.values(users).reduce(
					(col, user) => col.set(
							user.id,
							this.client.users.add(user) || user
						),
					new Collection()
				),
			members: Object.entries(members).reduce(
					(col, [id, member]) => col.set(
							id,
							this.guild
								? this.guild.members.add(
									{
										user: users[id],
										...member
									}
								)
								: member
						),
					new Collection()
				),
			roles: Object.values(roles).reduce(
					(col, role) => col.set(
							role.id,
							this.guild
								? this.guild.roles.add(role)
								: role
						),
					new Collection()
				),
			channels: Object.values(channels).reduce(
					(col, channel) => col.set(
							channel.id,
							this.client.channels.add(channel) || channel
						),
					new Collection()
				),
			messages: Object.values(messages).reduce(
					(col, message) => col.set(
							message.id,
							this.channel
								? this.channel.messages.add(message)
								: message
						),
					new Collection()
				)
		};
	};
};