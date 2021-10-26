'use strict';

const Base = require('./Base');
const ExtendedWebhookClient = require('../structures/ExtendedWebhookClient');
const InteractionAuthor = require('./InteractionAuthor');
const { InteractionTypes } = require('../interfaces/Types'); 

class BaseInteraction extends Base {
	/**
	 * @param {Client}
	 * @param {InteractionData}
	 */
	constructor(client, data) {
		super(client);
		/**
		 * @type {string}
		 */
		this.type = InteractionTypes[data.type];
		/**
		 * @type {Snowflake}
		 */
		this.id = data.id;
		/**
		 * @type {string}
		 */
		Object.defineProperty(this, 'token', {
			value: data.token
		});
		/**
		 * @type {Snowflake}
		 */
		this.applicationId = data.application_id;
		/**
		 * @type {Snowflake||null}
		 */
		this.guildId = data.guild_id || null;
		/**
		 * @type {Snowflake||null}
		 */
		this.channelId = data.channel_id || null;
		/**
		 * @type {ApplicationCommandAuthor}
		 */
		this.author = new InteractionAuthor(this.client, this);
		/**
		 * @type {ExtendedWebhookClient}
		 */
		this.webhook = new ExtendedWebhookClient(this.applicationId, this.token, this.client.options);
		/**
		 * @type {number}
		 */
		this.version = data.version;
		/**
		 * @type {Snowflake}
		 */
		this.userId = (data.member.user || data.user).id;
	};
	/**
	 * @return {Reply}
	 */
	get reply() {
		return new Reply(
				this.client,
				this,
				new ExtendedWebhookClient(this.applicationId, this.token, this.client.options)
			);
	};
	/**
	 * @return {TextChannel||null}
	 */
	get channel() {
		return this.channelId
		? this.client.channels.cache.get(this.channelId)
		: null;
	};
	/**
	 * @return {Guild||null}
	 */
	get guild() {
		return this.guildId
		? this.client.guilds.cache.get(this.guildId)
		: null;
	};
	/**
	 * @type {boolean}
	 */
	inGuild() {
		return Boolean(this.guildId && this.member);
	};
	/**
	 * @type {boolean}
	 */
	inCachedGuild() {
		return Boolean(this.guild && this.member);
	};
	/**
	 * @type {boolean}
	 */
	inRawGuild() {
		return Boolean(this.guildId && !this.guild && this.member);
	};
	/**
	 * @type {boolean}
	 */
	isCommand() {};
	/**
	 * @type {boolean}
	 */
	isButton() {};
	/**
	 * @type {boolean}
	 */
	isSelectMenu() {}; 
};