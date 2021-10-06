'use strict';

const BaseApplicationCommand = require('./BaseApplicationCommand.js');

/**
 * @extends (BaseApplicationCommand)
 */
class BaseApplicationCommandPermissions extends BaseApplicationCommand {
	/**
	 * @param (Client) client from discord.js
	 * @param (object) options
	 */
	constructor(client, options = {}) {
		super(client, options);
		this.endpoints = endpoints.permissions;
	};
};

module.exports = BaseApplicationCommandPermissions;