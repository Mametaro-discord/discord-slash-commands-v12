'use strict';

const Base = require('./Base.js');
const CommandAuthor = require('./CommandAuthor.js');
const ExtendedWebhookClient = require('../structures/ExtendedWebhookClient.js');
const { InteractionTypes } = require('../interfaces/Types.js');
const Followup = require('./Followup.js');
const Reply = require('./Reply.js');

/**
 * @extends (Base)
 */
class BaseCommandInteraction extends Base {
	/**
	 * @param (Client)
	 * @param (object)
	 */
	constructor(client, data = {}) {
		super(client);

		this.type = InteractionTypes[data.type];

		this.id = data.id;

		this.token = data.token;

		this.applicationId = data.application_id ? data.application_id : client.user.id;

		this.channelId = data.channel_id;

		this.guildId = data.guild_id;

		this.userId = (data.guild_id ? data.member.user : data.user).id;

		this.user = this.client.users.cache.get(this.userId);

		this.member = this.guild ? this.guild.members.cache.get(this.userId) : undefined;

		this.version = data.version;


		// COMMAND 
		this.commandId = data.data.id;

		this.commandName = data.data.name;

		this.author = new CommandAuthor(client, data, this);

		this.command = (this.guild ? this.guild : this.client).commands.cache.get(this.commandId);

		this.options = Util.transformApplicationCommandOptions(data.options);

		this.reply = new Reply(
			this.client,
			this,
			new ExtendedWebhookClient(this.applicationId, this.token, this.client.options)
		);

		this.followup = new Followup(
			this.client,
			this,
			new ExtendedWebhookClient(this.applicationId, this.token, this.client.options)
		);
	}

	/**
	 * The timestamp the interaction was created at
	 * @type {number}
	 * @readonly
	 */
	get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	/**
	 * The time the interaction was created at
	 * @type {Date}
	 * @readonly
	 */
	get createdAt() {
		return new Date(this.createdTimestamp);
	}

	/**
	 * The channel this interaction was sent in
	 * @type {?Channel}
	 * @readonly
	 */
	get channel() {
		return this.client.channels.cache.get(this.channelId);
	}

	/**
	 * The guild this interaction was sent in
	 * @type {?Guild}
	 * @readonly
	 */
	get guild() {
		return this.client.guilds.cache.get(this.guildId);
	}
};

module.exports = BaseCommandInteraction;