import {
  Client,
  Snowflake,
  Guild
} from "discord.js";

export function main(client:Client): void;

declare type ApplicationCommandTypes = "CHAT_INPUT" | "USER" | "MESSAGE";

export class Base {
	public client: Client;
}

export class ApplicationCommandPermissionsManager extends Base {
  // TODO
  public manager: ApplicationCommand;
  public guild: Guild
  public guildId: Snowflake | null;
  public commandId: Snowflake | null;
  permissionsPath(guildId: Snowflake, commandId: Snowflake): unknown; 
}

export class ApplicationCommand extends Base {
  public id: Snowflake;
  public applicationId: Snowflake;
  public guild: Guild | null;
  public guildId: Snowflake | null;
  public type: ApplicationCommandTypes;
  get createdTimestamp(): number;
  get createdAt(): Date;
  get manager(): ApplicationCommandPermissionsManager
}
