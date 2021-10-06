'use strict';

const ApplicationCommandPermissions = require('./ApplicationCommandPermissions.js');
const BaseApplicationCommand = require('./BaseApplicationCommand.js');
const BaseCommand = require('../../Classes/BaseCommand.js');
const getEndpoints = require('../endpoints/index.js');
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
	 * @return (BaseCommand) command data
	 */
	async get() {
		const json = await fetch(this.endpoints.get, {
			method: 'get',
			headers: this.headers
		}).then(res => res.json());
		return new BaseCommand(this.client, json);
	};
	/**
	 * @param (object) source of body json
	 * @return (BaseCommand) command data
	 */
	async edit(bodySource) {
		const json = await fetch(this.endpoints.edit, {
			method: 'patch',
			body: JSON.stringify(bodySource),
			headers: this.headers
		}).then(res => res.json);
		return new BaseCommand(this.client, json);
	};
	/**
	 * @return (BaseCommand) command data
	 */
	async delete() {
		const json = await fetch(this.endpoints.delete, {
			method: 'delete',
			body: JSON.stringify(bodySource),
			headers: this.headers
		});
		return new BaseCommand(this.client, json);
	};
};

module.exports = ApplicationCommand;