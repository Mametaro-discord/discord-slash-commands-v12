'use strict';

const BaseApplication = require('./BaseApplication.js');
const ApplicationCommand = require('./ApplicationCommand.js');
const ApplicationCommandAll = require('./ApplicationCommandAll.js');

/**
 * @extends (BaseApplication)
 */
class Application extends BaseApplication {
	/**
	 * @param (Client) client from discord.js
	 * @param (object) options
	 */
	constructor(client, options = {}) {
		super(client, options);
	};
	/**
	 * @param (Snowflake) commandId
	 * @return (CommandApplication)
	 */
	commands(id) {
		return new ApplicationCommand(this.client, this.options);
	};
	/**
	 * @return (ApplicationCommandAll)
	 */
	get commands() {
		return new ApplicationCommandAll(this.client, this.options);
	}
};