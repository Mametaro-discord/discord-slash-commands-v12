'use strict';

const BaseMessageComponent = require('./BaseMessageComponent');
const {
	MessageComponentTypes
} = require('../interfaces/consts');

class MessageActionRow extends BaseMessageComponent {
	/**
	 * @param {APIMessageActionRow | MessageActionRowData}
	 */
	constructor(data) {
		super({
			type: 'ACTION_ROW'
		});
		/**
		 * @param {ActionRowComponent}
		 */
		this.components = [];
		this.patch(data);
	};
	/**
	 * @param {APIMessageActionRow | MessageActionRowData}
	 * @return {undefined}
	 */
	patch(data) {
		if ('component' in data) this.components.push(BaseMessageComponent.create(data.component));
		if ('components' in data) this.components = [...this.components, ...data.components.map(BaseMessageComponent.create)];
	};
	/**
	 * @param {ActionRowComponent}
	 * @return {MessageActionRow}
	 */
	addComponent(component) {
		this.components.push(component);
	};
	/**
	 * @param {Array<ActionRowComponent | ActionRowComponent[]>}
	 * @return {MessageActionRow}
	 */
	addComponents(...components) {
		if (Array.isArray(components[0])) components = components[0];
		this.components.push(...components.map(BaseMessageComponent.create));
		return this;
	};
	/**
	 * @param {number} @optional
	 * @param {number} @optional
	 * @param {Array<ActionRowComponent | ActionRowComponent[]>}
	 * @return {MessageActionRow}
	 */
	spliceComponents(index, deleteCount, ...components) {
		if (Array.isArray(components[0])) components = components[0];
		this.components.splice(index, deleteCount, ...components.map(BaseMessageComponent.create));
		return this;
	};
	/**
	 * @return {APIMessageActionRow}
	 */
	toJSON() {
		return {
			type: MessageComponentTypes[this.type],
			components: this.components.map(c => c.toJSON());
		};
	};
};