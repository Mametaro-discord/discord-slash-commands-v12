'use strict';

const BaseApplicationCommandPermissions = require('./BaseApplicationCommandPermissions.js');
const { transformApplicationCommandPermissions } = require('../../util/Util.js');
const fetch = require('node-fetch');

/**
 * @extends (BaseApplicationCommand)
 */
class ApplicationCommandPermissions extends BaseApplicationCommandPermissions {
	/**
	 * @param (Client) client from discord.js
	 * @param (object) options
	 */
	constructor(client, options = {}) {
		super(client, options);
	};
	/**
	 * @return (BasePermissions) 
	 */
	async get() {
		const json = await fetch(this.endpoints.get, {
			method: 'get',
			headers: this.headers
		}).then(res => res.json());
		return transformApplicationCommandPermissions(json);
	};
	/**
	 * @param (object) source of body json
	 * @return ()
	 */
	async edit(bodySource) {
		const json = await fetch(this.endpoints.edit, {
			method: 'patch',
			body: JSON.stringify(bodySource),
			headers: this.headers
		}).then(res => res.json());
	};
};

module.exports = ApplicationCommandPermissions;