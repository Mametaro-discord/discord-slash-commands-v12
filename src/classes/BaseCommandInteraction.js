'use strict';

const Base = require('./Base.js');
const CommandAuthor = require('./CommandAuthor.js');
const ExtendedWebhookClient = require('../structures/ExtendedWebhookClient.js');
const { InteractionTypes } = require('../interfaces/Types.js');
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

		this.applicationId = data.application_id ? data.application_id : client.user.id;

		this.author = new CommandAuthor(client, data, this);

		this.channelId = data.channel_id;

		this.channel = this.client.channels.cache.get(this.channelId);

		this.guildId = data.guild_id;

		this.guild = this.guildId ? client.guilds.cache.get(this.guildId) : undefined;

		this.commandId = data.data.id;

		this.command = (this.guild ? this.guild : this.client).commands.col.get(this.commandId);

		this.commandName = this.command.name;

		this.options = Util.transformApplicationCommandOptions(data.options);

		this.id = data.id;

		this.userId = data.member.user.id;

		this.user = this.client.users.cache.get(this.userId);

		this.member = this.guild ? this.guild.members.cache.get(this.userId) : undefined;

		this.token = data.token;

		this.version = data.version;

		this.reply = new Reply(
				this.client,
				this,
				new ExtendedWebhookClient(data.application_id, data.token, this.client.options)
			);
	};
};

module.exports = BaseCommandInteraction;