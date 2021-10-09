'use strict';

const ApplicationCommandPermissions = require('./ApplicationCommandPermissions.js');
const BaseApplicationCommand = require('./BaseApplicationCommand.js');
const { transformApplicationCommand } = require('../../util/Util.js');
const fetch = require('node-fetch');

/**
 * @extends (BaseApplication)
 */
class ApplicationCommand extends BaseApplicationCommand {
	/**
	 * @param (Client) client from discord.js
	 * @param (object) options
	 */
	constructor(client, options = {}) {
		super(client, options);
	};
	/**
	 * @return (ApplicationCommandPermissions)
	 */
	get permissions() {
		return new ApplicationCommandPermissions(this.client, this.options);
	};
	/**
	 * @return (CommandData) from interfaces.ts
	 */
	async get() {
		const json = await fetch(this.endpoints.get, {
			method: 'get',
			headers: this.headers
		}).then(res => res.json());
		return transformApplicationCommand(json);
	};
	/**
	 * @param (object) source of body json
	 * @return (CommandData) from interfaces.ts
	 */
	async edit(bodySource) {
		const json = await fetch(this.endpoints.edit, {
			method: 'patch',
			body: JSON.stringify(bodySource),
			headers: this.headers
		}).then(res => res.json);
		return transformApplicationCommand(this.client, json);
	};
	/**
	 * @return (CommandData) from interfaces.ts
	 */
	async delete() {
		const json = await fetch(this.endpoints.delete, {
			method: 'delete',
			body: JSON.stringify(bodySource),
			headers: this.headers
		});
		return transformApplicationCommand(this.client, json);
	};
};

module.exports = ApplicationCommand;