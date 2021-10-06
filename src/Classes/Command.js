'use strict';

const BaseCommand = require('./BaseCommand.js');
const { SnowflakeUtil } = require('discord.js');

/**
* @extends (BaseCommand)
 */
class Command extends BaseCommand {
	/**
	* @param (Client) client from discord.js
	* @param (object) data of interaction
	 */
	constructor(client, data = {}) {
		super(client, data);
	};
	/**
	* @return (number) timestamp this was created
	 */
	get createdTimestamp() {
		return SnowflakeUtil.deconstructor(this.id).timestamp;
	};
	/**
	* @return (Date) time this was created
	 */
	get createdDate() {
		return new Date(this.createdTimestamp);
	};
};