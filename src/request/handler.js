'use strict';

const Base = require('./Base.js');

/**
 * @extends (Base)
 */
class Handler extends Base {
	/**
	 * @param (object) args
	 * @param (object)
	 */
	constructor(client, options = {}) {
		super(client);
		const { jsonSource, guildId, commandId } = options;
		const header = {
		'Authorization': `Bot ${client.token}`,
		'Content-Type': 'application/json'
	    };
		const json = JSON.stringify(jsonSource);
	};
};