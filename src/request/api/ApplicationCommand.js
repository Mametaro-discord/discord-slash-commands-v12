'use strict';

const BaseApplication = require('./BaseApplication.js');
const getEndpoints = require('../endpoints/index.js');
const fetch = require('node-fetch');

/**
 * @extends (BaseApplication)
 */
class ApplicationCommand extends BaseApplication {
	/**
	 * @param (Client) client from discord.js
	 * @param (object) options
	 */
	constructor(client, options = {}) {
		super(client, options);
	};
	/**
	 * @return (Command) command data
	 */
	async get() {
		const json = await fetch(this.endpoints.url, {
			method: 'get',
			header: this.header
		}).then(res => res.json());
		return json;
	};
	/**
	 * @param
	 */
};