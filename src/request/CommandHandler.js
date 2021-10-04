'use strict';

const getEndpoints = require('./endpoints/index.js');
const fetchFn = require('../util/fetch.js');

class Handler {
	/**
	 * @param (Client) client from discord.js
	 * @param (object) args
	 */
	static async get(client, options = {}) {
		const endpoints = getEndpoints(client, options);
		const { jsonSource, guildId, commandId } = options;
		const fetchOption = guildId ? endpoints.guild.get : endpoints.global.get;
		console.log(fetchOption.url);
		const json = await fetchFn(fetchOption);
		return json;
	};
	/**
	 * @param (Client) client from discord.js
	 * @param (object) args
	 */
	static async getAll(client, options = {}) {
		const endpoints = getEndpoints(client, options);
		const { jsonSource, guildId } = options;
		const fetchOption = guildId ? endpoints.guild.getAll : endpoints.global.getAll;
		const json = await fetchFn(fetchOption);
		return json;
	};
	/**
	 * @param (Client) client from discord.js
	 * @param (object) args
	 */
	static async create(client, options = {}) {
		const endpoints = getEndpoints(client, options);
		const { jsonSource, guildId, commandId } = options;
		const fetchOption = guildId ? endpoints.guild.create : endpoints.global.create;
		const json = await fetchFn(fetchOption);
		return json;
	};
	/**
	 * @param (Client) client from discord.js
	 * @param (object) args
	 */
	static async edit(client, options = {}) {
		const endpoints = getEndpoints(client, options);
		const { jsonSource, guildId, commandId } = options;
		const fetchOption = guildId ? endpoints.guild.edit : endpoints.global.edit;
		const json = await fetchFn(fetchOption);
		return json;
	};
	/**
	 * @param (Client) client from discord.js
	 * @param (object) args
	 */
	static async delete(client, options = {}) {
		const endpoints = getEndpoints(client, options);
		const { jsonSource, guildId, commandId } = options;
		const fetchOption = guildId ? endpoints.guild.delete : endpoints.global.delete;
		const json = await fetchFn(fetchOption);
		return json;
	};
	/**
	 * @param (Client) client from discord.js
	 * @param (object) args
	 */
	static async bulkOverwrite(client, options = {}) {
		const endpoints = getEndpoints(client, options);
		const { jsonSource, guildId, commandId } = options;
		const fetchOption = guildId ? endpoints.guild.blukOverwrite : endpoints.global.blukOverwrite;
		const json = await fetchFn(fetchOption);
		return json;
	};
};

module.exports = Handler;