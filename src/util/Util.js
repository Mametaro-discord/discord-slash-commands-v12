'use strict';

const { ApplicationCommandTypes, ApplicationCommandOptionsTypes, ApplicationCommandPermissionsTypes } = require('../interfaces/Types.js');

class Util {
	/**
	 * @param (Array<object>|object) data of command
	 * @return (object)
	 */
	static transformApplicationCommand(options) {
		const target = options instanceof Array ? options : [options];
		const transformed = target.map(element => {
			return {
				id: element.id,
				type: ApplicationCommandTypes[element.type],
				application_id: element.application_id,
				guild_id: element.guild_id,
				name: element.name,
				description: element.description,
				options: this.transformApplicationCommandOptions(element.options),
				default_permission: element.default_permission,
				version: element.version
			};
		});
		return options instanceof Array ? transformed : transformed.shift();
	};
	/*
	* @param (Array<object>) data of command
	* @return (object)
	 */
	static transformApplicationCommandOptions(options = []) {
		const transformed = options.forEach(element => {
			let property = [];
			while (true) {
				const optionsStr = `element${property.join('')}`;
				const code = `if (!${optionsStr}) break;\n${optionsStr} = execute(${optionsStr})`;
				property.push('[options]');
			};
		});
		function execute(options = []) {
			return options.map(element => {
				return {
					type: ApplicationCommandOptionsTypes[element.type],
					name: element.name,
					description: element.description,
					required: element.required,
					choices: element.choices,
					options: element.options
				};
			});
		};
		return options;
	};
	/**
	 * @param (Array<object>|object) data of permission
	 * @return (object)
	 */
	static transformApplicationCommandPermissions(options) {
		const target = options instanceof Array ? options : [options]
		const transformed = target.map(element => {
			return {
				id: elm.id,
				type: ApplicationCommandPermissionsTypes[elm.type],
				permission: elm.permission
			};
		});
		return options instanceof Array ? transformed : transformed.shift();
	};
};

module.exports = Util;