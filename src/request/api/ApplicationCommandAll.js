'use strict';

const ApplicationCommandPermissionsAll = require('./ApplicationCommandPermissionsAll.js');
const BaseApplicationCommand = require('./BaseApplicationCommand.js');
const BaseCommand = require('../../Classes/BaseCommand.js');
const getEndpoints = require('../endpoints/index.js');

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
	 * @return (Array<BaseCommand>) array of command data
	 */
	async get() {
		const json = await fetch(this.endpoints.getAll, {
			method: 'get',
			headers: this.headers
		}).then(res => res.json());
		return json.map(element => new BaseCommand(this.client, element));
	};
	/**
	 * @param (object) source of body json
	 * @return (BaseCommand) command data
	 */
	async create(bodySource) {
		const json = await fetch(this.endpoints.create, {
			method: 'post',
			body: JSON.stringify(bodySource),
			headers: this.headers
		}).then(res => res.json());
		return new BaseCommand(this.client, json);
	};
	/**
	 * @param (object) source of body json
	 * @return (Array<BaseCommand>) array of command data
	 */
	async blukOverwrite(bodySource) {
		const json = await fetch(this.endpoints.blukOverwrite, {
			method: 'put',
			body: JSON.stringify(bodySource),
			headers: this.headers
		});
		return json.map(element => new BaseCommand(this.client, element));
	};
};

module.exports = ApplicationCommandAll;