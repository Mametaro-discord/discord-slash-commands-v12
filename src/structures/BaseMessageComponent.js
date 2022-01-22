'use strict';

const Base = require('./Base');
const {
	MessageComponentTypes
} = require('../interfaces/consts');

module.exports = class BaseMessageComponent extends Base {
	/**
	 * @param {APIMessageComponent | MessageComponentData}
	 * @param {Client} @optional
	 */
	constructor(data, client) {
		super(client);
		this.type = 'type' in data ? this.constructor.resolveType(data.type) : null;
	};
	/**
	 * @param {APIMessageComponent | MessageComponentData}
	 * @param {Client} @optional
	 * @return {MessageComponent}
	 */
	static create(data, client) {
		let Component;

		switch(data.type) {
			case MessageComponentTypes.ACTION_ROW: component = require('./MessageActionRow'); break;
			case MessageComponentTypes.BUTTON: component = require('./MessageButton'); break;
			case MessageComponentTypes.SELECT_MENU: component = require('./MessageSelectMenu'); break;
		};

		return new Component(data, client);
	};
	/**
	 * @param {MessageComponentType}
	 * @param {boolean} @optional //Whether the type is received from API
	 * @return {MessageComponentType}
	 */
	static resolveType(type, received) {
		return received
			? typeof type === 'string' ? type : MessageComponentTypes[type]
			: typeof type === 'number' ? type : MessageComponentTypes[type];
	};
};