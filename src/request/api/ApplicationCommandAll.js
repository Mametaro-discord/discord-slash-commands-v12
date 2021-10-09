'use strict';

const ApplicationCommandPermissionsAll = require('./ApplicationCommandPermissionsAll.js');
const BaseApplicationCommand = require('./BaseApplicationCommand.js');
const { transformApplicationCommand } = require('../../util/Util.js');
const fetch = require('node-fetch');

/**
 * @extends (BaseApplication)
 */
class ApplicationCommandAll extends BaseApplicationCommand {
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
		return new ApplicationCommandPermissionsAll(this.client, this.options);
	};
	/**
	 * @return (Array<CommandData>) from interfaces.ts
	 */
	async getAll() {
		const json = await fetch(this.endpoints.getAll, {
			method: 'get',
			headers: this.headers
		}).then(res => res.json());
		return transformApplicationCommand(json);
	};
	/**
	 * @param (object) source of body json
	 * @return (CommandData) from interfaces.ts
	 */
	async create(bodySource) {
		const json = await fetch(this.endpoints.create, {
			method: 'post',
			body: JSON.stringify(bodySource),
			headers: this.headers
		}).then(res => res.json());
		return transformApplicationCommand(json);
	};
	/**
	 * @param (object) source of body json
	 * @return (Array<CommandData>) from interfaces.ts
	 */
	async blukOverwrite(bodySource) {
		const json = await fetch(this.endpoints.blukOverwrite, {
			method: 'put',
			body: JSON.stringify(bodySource),
			headers: this.headers
		});
		return transformApplicationCommand(json);
	};
};

module.exports = ApplicationCommandAll;