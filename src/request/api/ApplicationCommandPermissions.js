'use strict';

const BaseApplicationCommandPermissions = require('./BaseApplicationCommandPermissions.js');
const BasePermissions = require('../../Classes/BasePermissions.js');
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
		const json = await fetch(this.get, {
			method: 'get',
			headers: this.headers
		}).then(res => res.json());
	};
};