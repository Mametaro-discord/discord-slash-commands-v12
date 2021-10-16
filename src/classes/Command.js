'use strict';

const Base = require('./Base.js');
const CommandPermissionsManager = require('./CommandPermissionsManager.js');
const {
	ApplicationCommandTypes
} = require('../interfaces/Types.js');
const Util = require('../util/Util.js');
const {
	SnowflakeUtil
} = require('discord.js');

/**
 * @extends (Base)
 */
class Command extends Base {
	/**
	 * @param (Client) from discord.js
	 * @param (object) data of command
	 */
	constructor(client, data) {
		super(client);

		this.id = data.id;

		this.applicationId = data.application_id;

		this.guild = this.guildId ? client.guilds.cache.get(this.guildId) : null;

		this.guildId = data.guild_id;

		this.permissions = new CommandPermissionsManager(this);

		this.type = ApplicationCommandTypes[data.type];

		this._patch(data);
	}
	_patch(data) {
		if ('name' in data) {
			/**
			 * The name of this command
			 * @type {string}
			 */
			this.name = data.name;
		}

		if ('description' in data) {
			/**
			 * The description of this command
			 * @type {string}
			 */
			this.description = data.description;
		}

		if ('options' in data) {
			/**
			 * The options of this command
			 * @type {ApplicationCommandOption[]}
			 */
			this.options = Util.transformApplicationCommandOptions(data.options);
		} else {
			this.options || = [];
		}

		if ('default_permission' in data) {
			/**
			 * Whether the command is enabled by default when the app is added to a guild
			 * @type {boolean}
			 */
			this.defaultPermission = data.default_permission;
		}

		if ('version' in data) {
			/**
			 * Autoincrementing version identifier updated during substantial record changes
			 * @type {Snowflake}
			 */
			this.version = data.version;
		}
	}
	/**
	 * @return (number)
	 */
	get createdTimestamp() {
		return SnowflakeUtil.deconstructor(this.id).timestamp;
	}
	/**
	 * @return (Date)
	 */
	get createdDate() {
		return new Date(this.createdTimestamp);
	}
	/**
	 * @return (CommandManager||GuildCommandManager)
	 */
	get manager() {
		return (this.guild ? this.guild : this.client).commands;
	}
	/**
	 * @param (CommandData)
	 * @return (Promise<Command>)
	 */
	async edit(data) {
		return await this.manager.edit(this.id, data, this.guildId);
	}
	/**
	 * @return (Promise<Command>)
	 */
	async delete() {
		return await this.manager.delete(this.id, this.guildId);
	}
};

module.exports = Command;