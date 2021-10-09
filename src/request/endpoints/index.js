'use strict';

const Base = require('../../classes/Base.js')

/**
 * @extends (Base)
 */
class GetEndpoints extends Base {
	/**
	 * @param (Client) client from discord.js
	 * @param (EndpointsOption) from interfaces.ts
	 */
	constructor(client, options = {}) {
		super(client);
		
		Object.defineProperty(this, 'options', {
			value: options
		});
	};

	/**
	 * @return (object)
	 */
	get globalCommand() {
		const { commandId } = this.options;
		const endpoints = {
			get: `commands/${commandId}`,
			getAll: `commands`,
			create: `commands`,
			edit: `commands/${commandId}`,
			delete: `commands/${commandId}`,
			blukOverwrite: `commands`
		};
		for (let k in endpoints) {
			endpoints[k] = `https://discord.com/api/v8/applications/${this.client.user.id}/` + endpoints[k];
		};
		return endpoints;
	};
	/**
	 * @return (object)
	 */
	get guildCommand() {
		const { commandId, guildId } = this.options; 
		const endpoints = {
			get: `commands/${commandId}`,
			getAll: `commands`,
			create: `commands`,
			edit: `commands/${commandId}`,
			delete: `commands/${commandId}`,
			blukOverwrite: `commands`,
			permissions: {
				get: `commands/${commandId}/permissions`,
				getAll: `commands/permissions`,
				edit: `commands/${commandId}/permissions`,
				batchEdit: `commands/permissions`
			}
		};
		for (let k in endpoints) {
			endpoints[k] = `https://discord.com/api/v8/applications/${this.client.user.id}/guilds/${guildId}/` + endpoints[k].url;
			endpoints[k].client = client;
		};
		return endpoints;
	};
	/**
	 * @return (object)
	 */
	get interaction() {
		const { interactionId, interactionToken } = this.options;
		const endpoints = {
			create: `callback`
		};
		for (let k in endpoints) {
			endpoints[k] = `https://discord.com/api/v8/interaction/${interactionId}/${interactionToken}` + endpoints[k];
		};
		return endpoints;
	};
};

module.exports = GetEndpoints;