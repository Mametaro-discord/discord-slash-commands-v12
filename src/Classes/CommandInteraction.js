'use strict';

const Base = require('./Base.js');
const Command = require('./Command.js');
const CommandAuthor = require('./CommandAuthor.js');
const ReplyManager = require('./ReplyManager.js');
const { WebhookClient } = require('discord-buttons');

/**
* @extends (Base)
 */
class CommandInteraction extends Base {
	/**
	* @param (Client) client from discord.js
	* @param (object) data of interaction
	 */
	constructor(client, data = {}) {
		super(client);

		this.applicationId = data.application_id ? data.application_id : client.user.id;

		this.author = new CommandAuthor(client, data, this);

		this.channel = client.channels.cache.get(data.channel_id);

		this.command = new Command(client, data);

		this.guild = data.guild_id ? client.guilds.cache.get(data.guild_id) : undefined;

		this.id = data.id;

		this.reply = new ReplyManager(client, this, new WebhookClient(this.applicationId ? this.applicationId : (data.application_id ? data.application_id : client.user.id)));

		this.token = data.token;

		this.version = data.version;
	};
	/**
	* @param ()
	 */
};