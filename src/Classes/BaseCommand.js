'use strict';

const Base = require('./Base.js');
const Util = require('../util/Util.js');

/**
* @extends (Base)
 */
class BaseCommand extends Base {
	/**
	* @param (Client) client from discord.js
	* @param (object) data of interaction
	 */
	constructor(client, data) {
		super(client);

		this.applicationId = data.application_id;

		this.id = data.id;

		this.name = data.name;

		this.description = data.description;

		this.version = data.version;

		this.defaultPermission = data.default_permission;

		this.type = Util.transformType(data.type, 'string');

		this.guild = data.guild_id ? client.guilds.cache.get(data.guild_id) : undefined;

		this.options = Util.transformOptions(data.options);
	};
};

module.exports = BaseCommand;