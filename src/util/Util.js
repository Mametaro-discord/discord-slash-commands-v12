'use strict';

const { ApplicationCommandTypes, ApplicationCommandOptionsTypes, ApplicationCommandPermissionsTypes } = require('../request/typedef/Types.js');

class Util {
	/**
	 * @param (Array<object>) data of command
	 * @return (object)
	 */
	static transformeApplicationCommand(options) {
		const transformed = options.map(element => {
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
		return transformed;
	};
	/*
	* @param (Array<object>) data of command
	* @return (object)
	 */
	static transformApplicationCommandOptions(options = []) {
		let transformed = [];
		let target = options;
		while(true) {
			transformed.push(target.map(element => {
				return {
					type: ApplicationCommandOptionsTypes[element.type],
					name: element.name,
					description: element.description,
					required: element.required,
					choices: element.choices,
					options
				}
			}))
		}
	}
	static transformApplicationCommandOptions(options = []) {
		const transformed = options.map(element => {
			return {
				type: ApplicationCommandOptionsTypes[options.type],
				name: element.name,
				description: options.description,
				required: options.required ? options.required : undefined,
				choices: options.choices ? options.choices : undefined,
				options: options.options ? options.options : undefined
			};
		});
		return transformed;
	};
	/**
	 * @param (Array<object>) data of permission
	 * @return (object)
	 */
	static transformApplicationCommandPermissions(options) {
		const transformed = options.map(element => {
			return {
				id: element.id,
				application_id: element.application_id,
				guild_id: element.guild_id,
				permissions: element.permissions.map(elm => {
					return {
						id: elm.id,
						type: ApplicationCommandPermissionsTypes[elm.type],
						permission: elm.permission
					};
				})
			};
		});
	};
};

module.exports = Util;