/**
 * @output
 */
interface CommandData {
	id: Snowflake,
	type: number | string,
	application_id: string,
	guild_id: string,
	name: string,
	description: string,
	options: object,
	default_permission: boolean,
	version: string
};

/**
 * @input @output
 */
interface CommandOptionsChoicesData {
	name: string,
	value: number | string
};

/**
 * @input @output
 * @optional (required, choices, options)
 */
interface CommandOptionsData {
	type: number | string,
	name: string,
	description: string,
	required: boolean,
	choices: CommandOptionsChoicesData[],
	options: this[]
};

/**
 * @input @output
 */
interface CommandPermissionsData {
	id: Snowflake,
	type: number | string,
	permission: boolean
};

/**
 * @input @output
 */
interface CommandPermissionsObject {
	id: Snowflake,
	application_id: Snowflake,
	guild_id: Snowflake,
	permissions: CommandPermissionsData[]
};

/**
 * @input
 * @optional ALL
 */
interface EndpointsOption {
	commandId: Snowflake,
	guildId: Snowflake,
	interactionId: Snowflake,
	interactionToken: string
};

/**
 * @input @output
 * @optional ALL
 */

interface InteractionCallbackData {
	tts: boolean,
	content: string,
	embeds: object[],
	allowed_mentions: object[],
	flags: number,
	components: object[]
};

/**
 * @input 
 */
interface InteractionResponse {
	type: string,
	data: InteractionCallbackData
};

/**
 * @useonlyhere
 */
interface Snowflake {};