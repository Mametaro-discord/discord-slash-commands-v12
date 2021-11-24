import {
  Client,
  Snowflake,
  Guild,
  Collection
} from "discord.js";

export function main(client:Client): void;

declare type ApplicationCommandTypes = "CHAT_INPUT" | "USER" | "MESSAGE";

declare type ApplicationCommandPermissionsTypes = "ROLE" | "USER";

export class Base {
	public client: Client;
}

export type ApplicationCommandPermissionsFetchOptions = {
  guildId?: Snowflake;
  commandId?: Snowflake;
};

export type ApplicationCommandPermissionsSetOptions = ApplicationCommandPermissionsFetchOptions & {
  permissions: ApplicationCommandPermissions[];
  fullPermissions: FullApplicationCommandPermissions[];
};

export type ApplicationCommandPermissions = {
  id: Snowflake;
  type: ApplicationCommandPermissionsTypes;
  permission: boolean;
}

export class ApplicationCommandPermissionsManager extends Base {
  // TODO
  public manager: ApplicationCommand;
  public guild: Guild
  public guildId: Snowflake | null;
  public commandId: Snowflake | null;
  permissionsPath(guildId: Snowflake, commandId: Snowflake): unknown;
  fetch(options: ApplicationCommandPermissionsFetchOptions): Promise<ApplicationCommandPermissions[] | Collection<Snowflake, ApplicationCommandPermissions[]>>;
  set(options: ApplicationCommandPermissionsSetOptions): Promise<ApplicationCommandPermissions[] | Collection<Snowflake, ApplicationCommandPermissions[]>>;
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

