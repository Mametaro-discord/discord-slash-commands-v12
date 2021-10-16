'use strict';

const Base = require('./Base.js');
const { ApplicationCommandTypes } = require('../interfaces/Types.js');
const Util = require('../util/Util.js');

/**
 * @extends (Base)
 */
class BaseCommand extends Base {
	/**
	 * @param (Client) from discord.js
	 * @param (object) data of command
	 */
	constructor(client, data = {}) {
		super(client);

		this.application_id = data.application_id;

		this.defaultPermission = data.default_permission;

		this.description = data.description;

		this.guildId = data.guild_id;

		this.guild = this.guildId ? client.guilds.cache.get(this.guildId) : undefined;

		this.id = data.id;

		this.name = data.name;

		this.options = Util.transformApplicationCommandOptions(data.options);

		this.type = ApplicationCommandTypes[data.type];

		this.version = data.version;
	};
};

module.exports = BaseCommand;