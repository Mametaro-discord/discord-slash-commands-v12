'use strict';

const Base = require('./Base.js');
const Command = require('./Command.js');
const CommandAuthor = require('./CommandAuthor.js');
const Reply= require('./Reply.js');
const Followup = require('./Followup.js');
const ExtendedWebhookClient = require('../structures/ExtendedWebhookClient.js');

/**
* @extends (Base)
 */
class BaseInteraction extends Base {
	/**
	* @param (Client) client from discord.js
	* @param (object) data of interaction
	 */
	constructor(client, data = {}) {
		super(client);

		this.type = InteractionTypes[data.type];

		this.applicationId = data.application_id ? data.application_id : client.user.id;

		this.author = new CommandAuthor(client, data, this);

		this.channelId = data.channel_id;

		this.channel = client.channels.cache.get(this.channelId);

		this.guildId = data.guild_id;

		this.guild = this.guildId ? client.guilds.cache.get(this.guildId) : undefined;

		this.commandId = data.data.id;

		this.id = data.id;

		this.userId = data.member.user.id;

		this.token = data.token;

		this.version = data.version;

		this.user = client.users.cache.get(this.userId);

		this.member = this.guild ? this.guild.members.cache.get(this.userId) : undefined;

		this.webhook = null;

		this.reply = new Reply(client, this, new ExtendedWebhookClient(data.application_id, data.token, client.options));

		this.followup = new Followup(client, this, new ExtendedWebhookClient(data.application_id, data.token, client.options));
	};
};

module.exports = BaseInteraction;