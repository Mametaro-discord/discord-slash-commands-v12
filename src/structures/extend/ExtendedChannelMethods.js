const ExtendedAPIMessage = require('./ExtendedAPIMessage');
const InteractionCollector = require('../InteractionCollector');
const { Structures } = require('discord.js');
const GuildMember = Structures.get('GuildMember');
const User = Structures.get('User');
const {
	InteractionTypes
} = require('../../interfaces/consts');

module.exports = {
	send: async function(content, options) {
		if (typeof content === 'object') {
			if (content.embed instanceof MessageEmbed) {
				if (Array.isArray(options.embeds)) options.embeds.push(content.embed);
				else options.embeds = [content.embed];
			};
			if (content.embeds instanceof MessageEmbed) {
				if (Array.isArray(options.embeds)) options.embeds = [...options.embeds, ...content.embeds];
				else options.embeds = [...content.embeds];
			};
		}

		if (options.embed) {
			if (Array.isArray(options.embeds)) options.embeds.push(options.embed);
			else options.embeds = [options.embed];
		};

		if ((typeof content === 'object' && content.ephemeral) || options.ephemeral) options.flags = 1 << 6;
		
		const { data, files } = await (
				content instanceof ExtendedAPIMessage
				? content
				: ExtendedAPIMessage.create(this, content, options)
			)
			.resolveData()
			.resolveFiles();

		const result = await this.client.api.channels(this.id).messages.post({ data, files });

		return this.messages ? this.messages.add(result) || result : result;
	},
	createMessageComponentCollector: function(client, filter, options = { max: 1 }) {
		return new InteractionCollector(
				client,
				filter,
				{
					...options,
					interactionType: InteractionTypes.MESSAGE_COMPONENT,
					channel: this
				}
			);
	},
	awaitMessageComponent(filter, options = { max: 1 }) {
		return new Promise(
				(resolve, reject) => this.createMessageComponentCollector(filter, options).on(
						'end',
						(interactions, reason) => {
							const interaction = interactions.first();
							if (interaction) resolve(interaction);
							else reject(new Error(reason));
						}
					)
			);
	}
};