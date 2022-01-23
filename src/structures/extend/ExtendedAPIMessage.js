'use strict';

const { MessageComponentTypes } = require('../../interfaces/consts');
const { APIMessage, MessageEmbed } = require('discord.js');
const BaseMessageComponent = require('../BaseMessageComponent');
const MessageActionRow = require('../MessageActionRow');
const MessageButton = require('../MessageButton');
const MessageSelectMenu = require('../MessageSelectMenu');

module.exports = class ExtendedAPIMessage extends APIMessage {
	/**
	 * @param {Client} @optional
	 * @return {ExtendedAPIMessage}
	 */
	resolveData(client) {
		if (this.data) return this;

		super.resolveData();

		if (this.options.ephemeral) this.data.flags = 1 << 6;

		let components = [];

		//If this.options is component
		if (this.options instanceof MessageActionRow) {
			components.push(this.options.toJSON());
		};

		if (this.options instanceof MessageButton) {
			components.push({
				type: MessageComponentTypes.ACTION_ROW,
				components: [this.options.toJSON()]
			});
		};

		if (this.options instanceof MessageSelectMenu) {
			components.push({
				type: MessageComponentTypes.ACTION_ROW,
				components: [this.options.toJSON()]
			});
		};

		//If this.options.component is component
		if (this.options.component instanceof MessageActionRow) {
			components.push(this.options.component.toJSON());
		};

		if (this.options.component instanceof MessageButton) {
			components.push({
				type: MessageComponentTypes.ACTION_ROW,
				components: [this.options.component.toJSON()]
			});
		};

		if (this.options.component instanceof MessageSelectMenu) {
			components.push({
				type: MessageComponentTypes.ACTION_ROW,
				components: [this.options.component.toJSON]
			});
		};

		//If this.options.components is component or array of it
		if (this.options.components) {
			if (Array.isArray(this.options.components)) {
				this.options.components.forEach(component => {
					if (component instanceof MessageActionRow) {
						components.push(component.toJSON());
					};

					if (component instanceof MessageButton) {
						components.push({
							type: MessageComponentTypes.ACTION_ROW,
							components: [component.toJSON()]
						});
					};

					if (component instanceof MessageSelectMenu) {
						components.push({
							type: MessageComponentTypes.ACTION_ROW,
							components: [component.toJSON()]
						});
					};
				});
			} else {
				if (this.options.components instanceof MessageActionRow) {
					components.push(this.options.components.toJSON());
				};

				if (this.options.components instanceof MessageButton) {
					components.push({
						type: MessageComponentTypes.ACTION_ROW,
						components: [this.options.components.toJSON()]
					});
				};

				if (this.options.components instanceof MessageSelectMenu) {
					components.push({
						type: MessageComponentTypes.ACTION_ROW,
						components: [this.options.components.toJSON()]
					});
				};
			};
		};

		//If this.options.row is action row
		if (this.options.row) {
			if (this.options.row instanceof MessageActionRow) {
				components.push(this.options.row.toJSON());
			} else {
				components.push((new MessageActionRow(this.options.row, client)).toJSON());
			};
		};

		//If this.options.rows is action row or array of it
		if (this.options.rows) {
			if (Array.isArray(this.options.rows)) {
				this.options.rows.forEach(row => {
					if (row instanceof MessageActionRow) {
						components.push(row.toJSON());
					} else {
						components.push((new MessageActionRow(row, client)).toJSON());
					};
				});
			} else {
				if (this.options.rows instanceof MessageActionRow) {
					components.push(this.options.rows.toJSON());
				} else {
					components.push((new MessageActionRow(this.options.rows, client)).toJSON());
				};
			};
		};

		//If this.options.button is button
		if (this.options.button) {
			if (this.options.button instanceof MessageButton) {
				components.push({
					type: MessageComponentTypes.ACTION_ROW,
					components: [this.options.button.toJSON()]
				});
			} else {
				components.push({
					type: MessageComponentTypes.ACTION_ROW,
					components: [(new MessageButton(button, client)).toJSON()]
				});
			};
		};

		//If this.options.buttons is button or array of it
		if (this.options.buttons) {
			if (Array.isArray(this.options.buttons)) {
				this.options.buttons.forEach(button => {
					if (button instanceof MessageButton) {
						components.push({
							type: MessageComponentTypes.ACTION_ROW,
							components: [button.toJSON()]
						});
					} else {
						components.push({
							type: MessageComponentTypes.ACTION_ROW,
							components: [(new MessageButton(button, client)).toJSON()]
						});
					};
				});
			} else {
				if (this.options.buttons instanceof MessageButton) {
					components.push({
						type: MessageComponentTypes.ACTION_ROW,
						components: [this.options.buttons.toJSON()]
					});
				} else {
					components.push({
						type: MessageComponentTypes.ACTION_ROW,
						components: [(new MessageButton(button, client)).toJSON()]
					});
				};
			};
		};

		//If this.options.menu is select menu
		if (this.options.menu) {
			if (this.options.menu instanceof MessageSelectMenu) {
				components.push({
					type: MessageComponentTypes.ACTION_ROW,
					components: [this.options.menu.toJSON()]
				});
			} else {
				components.push({
					type: MessageComponentTypes.ACTION_ROW,
					components: [(new MessageSelectMenu(button, client)).toJSON()]
				});
			};
		};

		//If this.options.menus is select menu or array of it
		if (this.options.menus) {
			if (Array.isArray(this.options.menus)) {
				this.options.menus.forEach(menu => {
					if (menu instanceof MessageSelectMenu) {
						components.push({
							type: MessageComponentTypes.ACTION_ROW,
							components: [menu.toJSON()]
						});
					} else {
						components.push({
							type: MessageComponentTypes.ACTION_ROW,
							components: [(new MessageSelectMenu(button, client)).toJSON()]
						});
					};
				});
			} else {
				if (this.options.menus instanceof MessageSelectMenu) {
					components.push({
						type: MessageComponentTypes.ACTION_ROW,
						components: [this.options.menus.toJSON()]
					});
				} else {
					components.push({
						type: MessageComponentTypes.ACTION_ROW,
						components: [(new MessageSelectMenu(button, client)).toJSON()]
					});
				};
			};
		};

		this.data.components = components;

		return this;
	};
};