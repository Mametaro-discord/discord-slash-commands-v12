'use strict';

class Util {
	/*
	* @param (string|number) type source
	* @param (string) type transform to 
	* @return (string|number)
	 */
	transformType(source, target) {
		let type;
		const types = [
			[1, 'CHAT_INPUT'],
			[2, 'USER'],
			[3, 'MESSAGE']
		];
		if (target === 'string') {
			const elm = types.find(element => element[1] === source);
			type = elm[0];
		};
		if (target === 'number') {
			const elm = types.find(element => element[0] === source);
			type = elm[1];
		};
		return type;
	};
	/*
	* @param (string|number) type source
	* @param (string) type trasnform to
	* @return (string|number)
	 */
	trasnformOptionsType(source, target) {
		let type;
		const types = [
			[1, 'SUB_COMMAND'],
			[2, 'SUB_COMMAND_GROUP'],
			[3, 'STRING'],
			[4, 'INTEGER'],
			[5, 'BOOLEAN'],
			[6, 'USER'],
			[7, 'CHANNEL'],
			[8, 'ROLE'],
			[9, 'MENTIONABLE']
		];
		if (target === 'string') {
			const elm = types.find(element => element[1] === source);
			type = elm[0];
		};
		if (target === 'number') {
			const elm = types.find(element => element[0] === source);
			type = elm[1];
		};
		return type;
	};
	/*
	* @param (object) data of command
	 */
	transformOptions(options) {
		const a = options.map(element => {
			return {
				type: this.transformOptionsType(element.type, 'string'),
				name: element.name,
				description: options.description,
				required: options.required ? options.required : undefined,
				choices: options.choices ? options.choices : undefined,
				options: options.options ? options.options : undefined
			};
		});
	};
};

module.exports = Util;