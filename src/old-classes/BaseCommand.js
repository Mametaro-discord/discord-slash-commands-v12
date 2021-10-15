'use strict';

const Base = require('./Base.js');
const { ApplicationCommandTypes } = require('../interfaces/Types.js');
const Util = require('../util/Util.js');
const CommandPermissionsManager = require('./CommandPermissionsManager.js');

/**
* @extends (Base)
 */
class BaseCommand extends Base {
	/**
	* @param (Client) client from discord.js
	* @param (object) data of command
	 */
	constructor(client, data = {}) {
		super(client);

		this.applicationId = data.application_id;

		this.id = data.id;

		this.name = data.name;

		this.description = data.description;

		this.version = data.version;

		this.defaultPermission = data.default_permission;

		this.type = ApplicationCommandTypes[data.type];

		this.guildId = data.guild_id;

		this.guild = this.guildId ? client.guilds.cache.get(this.guildId) : undefined;

		this.options = Util.transformApplicationCommandOptions(data.options);
	};
};

module.exports = BaseCommand;