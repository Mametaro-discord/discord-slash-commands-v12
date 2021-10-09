'use strict';

const BaseApplicationCommandPermissions = require('./BaseApplicationCommandPermissions.js');
const { transformApplicationCommandPermissions } = require('../../util/Util.js');
const fetch = require('node-fetch');

/**
 * @extends (BaseApplicationCommandPermissions)
 */
class ApplicationCommandPermissionsAll extends BaseApplicationCommandPermissions {
	/**
	 * @param (Client) client from discord.js
	 * @param (object) options
	 */
	constructor(client, options = {}) {
		super(client, options);
	};
	/**
	 * @return ()
	 */
	async getAll() {
		const json = await fetch(this.endpoints.getAll, {
			method: 'get',
			headers: this.headers
		}).then(res => res.json());
		return transformApplicationCommandPermissions(json);
 	};
 	/**
 	 * @param (bodySource)
 	 * @return ()
 	 */
 	async batchEdit(bodySource) {
 		const json = await fetch(this.endpoints.batchEdit, {
 			method: 'put',
 			body: JSON.stringify(bodySource),
 			headers: this.headers
 		}).then(res => res.json());
 		return transformApplicationCommandPermissions(json);
 	};
};

module.exports = ApplicationCommandPermissionsAll;