'use strict';

const Base = require('./Base.js');
const { ApplicationCommandPermissionsTypes } = require('../request/typedef/Types.js');

/**
 * @extends (Base)
 */
class BasePermissions extends Base {
	/**
	 * @param (Client) client from discord.js
	 * @param (object) data of permissions
	 */
	constructor(client, data = {}) {
		super(client);

		this.id = data.id;

		this.type = ApplicationCommandPermissionsTypes[data.type];

		this.permission = data.permission;
	};
};

module.exports = BasePermissions;