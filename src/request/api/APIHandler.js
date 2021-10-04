'use strict';

const Base = require('../../Classes/Base.js');
const Application = require('./Application.js');

/**
 * @extends (Base)
 */
class APIHandler extends Base {
	/**
	 * @param (Client) client from discord.js
	 */
	constructor(client) {
		super(client);
	};
	/**
	 * @return (Application)
	 */
	applications() {
		return new Application(this.client);
	};
};