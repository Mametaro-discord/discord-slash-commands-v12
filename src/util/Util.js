'use strict';

const { ApplicationCommandTypes, ApplicationCommandOptionsTypes, ApplicationCommandPermissionsTypes } = require('../interfaces/Types.js');

class Util {
	/**
	 * @param (array<object>|object) data of command
	 * @return (object)
	 */
	static transformApplicationCommand(options) {
		const target = Array.isArray(options) ? options : [options];
		const transformed = target.map(elm => {
			return {
				id: elm.id,
				type: ApplicationCommandTypes[elm.type],
				application_id: elm.application_id || elm.applicationId,
				guild_id: elm.guild_id || elm.guildId,
				name: elm.name,
				description: elm.description,
				options: this.transformApplicationCommandOptions(elm.options),
				default_permission: elm.default_permission || elm.defaultPermission,
				version: elm.version
			};
		});
		return Array.isArray(options) ? transformed : transformed.shift();
	};
	/*
	* @param (Array<object>) data of command
	* @return (object)
	 */
	static transformApplicationCommandOptions(options = []) {
		options.forEach(elm => {
			let property = [];
			while (true) {
				const optionsStr = property[0]
				? `elm${property.join('')}`
				: `elm`;
				const code = `if (!${optionsStr}) break;\n${optionsStr} = execute(${optionsStr})`;
				eval(code);
				property.push('[options]');
			};
		});
		function execute(options = []) {
			return options.map(elm => {
				return {
					type: ApplicationCommandTypes[elm.type],
					name: elm.name,
					description: elm.description,
					required: elm.required,
					choices: elm.choices,
					options: elm.options
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
		const target = Array.isArray(options) ? options : [options];
		const transformed = target.map(element => {
			return {
				id: elm.id,
				type: ApplicationCommandPermissionsTypes[elm.type],
				permission: elm.permission
			};
		});
		return Array.isArray(options) ? transformed : transformed.shift();
	};
};

module.exports = Util;