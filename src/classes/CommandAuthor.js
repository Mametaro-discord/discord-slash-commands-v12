'use strict';

const Base = require('./Base.js');

/**
* @extends (Base)
 */
class CommandAuthor extends Base {
	/**
	* @param (Client) client from discord.js
	* @param (object) data of interaction
	* @param (CommandInteraction) CommandInteraction
	 */
	constructor(client, data = {}, cmdIa = {}) {
		this.id = data.guild_id ? data.member.user.id : data.user.id;

		this.user = client.users.cache.get(this.id);

		this.member = cmdIa.guild ? cmdIa.guild.members.cache.get(this.id) : undefined;
	};
	/**
	* @return (boolean) true
	 */
	async fetch() {
		this.user = await client.users.fetch(data.guild_id ? data.member.user.id : data.user.id);
		if (cmdIa.guild) {
			this.member = await cmdIa.guild.members.fetch(data.member.user.id);
		};
		return true;
	};
};

module.exports = CommandAuthor;