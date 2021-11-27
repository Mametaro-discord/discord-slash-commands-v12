import {
  Client,
  Snowflake,
  Guild,
  Collection,
  BaseManager,
  TextChannel,
  User,
  GuildMember,
  Webhook,
  StringResolvable,
  APIMessage,
  Message,
  WebhookClient
} from "discord.js";

export function main(client:Client): void;

export type ApplicationCommandTypes = "CHAT_INPUT" | "USER" | "MESSAGE";

export type InteractionTypes = "PING" | "APPLICATION_COMMAND" | "MESSAGE_COMPONENT"

export type ApplicationCommandPermissionsTypes = "ROLE" | "USER";

export class Base {
	public readonly client: Client;
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
};

export type ChannelTypes = "GUILD_TEXT" | "DM" | "GUILD_VOICE" | "GROUP_DM" | "GUILD_CATEGORY" | "GUILD_NEWS" | "GUILD_STORE" | "GUILD_NEWS_THREAD" | "GUILD_PUBLIC_THREAD" | "GUILD_PRIVATE_THREAD" | "GUILD_STAGE_VOICE";

export type ApplicationCommandOptionsChoices = {
  name: string;
  value: string | number;
};

export type ApplicationCommandOptions = {
  autocomplete?: boolean;
  channel_types?: ChannelTypes[];
  choices?: ApplicationCommandOptionsChoices[]
};

export type ApplicationCommandOptionsTypes = "SUB_COMMAND" | "SUB_COMMAND_GROUP" | "STRING" | "INTEGER" | "BOOLEAN" | "USER" | "CHANNEL" | "ROLE" | "MENTIONABLE" | "NUMBER";

export type ApplicationCommandData = {
  applicationId: Snowflake;
  default_permission?: boolean;
  guildId?: Snowflake;
  id: Snowflake;
  options?: ApplicationCommandOptions[];
  description: string;
  name: string;
  required?: boolean;
  type: ApplicationCommandOptionsTypes;
};

export type ApplicationCommandResolvable = ApplicationCommand | Snowflake;

export type ApplicationCommandPermissionsAddOptions = {
  guildId?: Snowflake;
  commandId: Snowflake;
  permissions: ApplicationCommandPermissions[];
};

export type ApplicationCommandPermissionsRemoveOptions = {
  guildId?: Snowflake;
  commandId: Snowflake;
  users?: Snowflake[];
  roles?: Snowflake[];
};

export type ApplicationCommandPermissionsHasOptions = {
  guildId?: Snowflake;
  commandId: Snowflake;
  id: Snowflake;
};

export type ApplicationCommandPermissionsCommandPathOptions = {
  commandId: Snowflake,
  guildId?: Snowflake
};

export type ApplicationCommandFetchOptions = {
  commandId: Snowflake;
  guildId?: Snowflake;
  cache?: boolean;
  force: boolean;
}

export class ApplicationCommandManager extends BaseManager<Snowflake, {},ApplicationCommandResolvable> {
  protected constructor(client: Client, iterable: Array<"Structure">, holds: unknown);
  get permissions(): ApplicationCommandPermissionsManager;
  add(data: ApplicationCommandData, cache:boolean, guildId: unknown): {}; 
  commandPath(options:ApplicationCommandPermissionsCommandPathOptions): unknown;
  create(data: ApplicationCommandData, guildId?: Snowflake): Promise<ApplicationCommand>;
  set(commands: ApplicationCommandData[], guildId?: Snowflake): Promise<Collection<Snowflake, ApplicationCommand>>;
  edit(commandId: Snowflake, data: Partial<ApplicationCommandData>, guildId?: Snowflake): Promise<ApplicationCommand>;
  delete(commandId: Snowflake, guildId?: Snowflake): Promise<ApplicationCommand>;
  fetch(options: ApplicationCommandFetchOptions): Promise<ApplicationCommand | Collection<Snowflake, ApplicationCommand>>;
}

export class ApplicationCommandPermissionsManager extends Base {
  protected constructor(manager: ApplicationCommand | ApplicationCommandManager | GuildApplicationCommandManager);
  public manager: ApplicationCommand | ApplicationCommandManager | GuildApplicationCommandManager;
  public guild: Guild
  public guildId: Snowflake | null;
  public commandId: Snowflake | null;
  permissionsPath(guildId: Snowflake, commandId: Snowflake): unknown;
  fetch(options: ApplicationCommandPermissionsFetchOptions): Promise<ApplicationCommandPermissions[] | Collection<Snowflake, ApplicationCommandPermissions[]>>;
  set(options: ApplicationCommandPermissionsSetOptions): Promise<ApplicationCommandPermissions[] | Collection<Snowflake, ApplicationCommandPermissions[]>>;
  add(options: ApplicationCommandPermissionsAddOptions): Promise<ApplicationCommandPermissions[]>;
  remove(options: ApplicationCommandPermissionsRemoveOptions): Promise<ApplicationCommandPermissions[]>;
  has(options: ApplicationCommandPermissionsHasOptions): Promise<boolean>;

}

export class ApplicationCommand extends Base {
  protected constructor(client: Client, data: unknown, guild: Guild, guildId: Snowflake);
  public id: Snowflake;
  public applicationId: Snowflake;
  public guild: Guild | null;
  public guildId: Snowflake | null;
  public type: ApplicationCommandTypes;
  get createdTimestamp(): number;
  get createdAt(): Date;
  get manager(): ApplicationCommandManager;
  get permissions(): ApplicationCommandPermissionsManager;
  patch(data: Partial<ApplicationCommandData>): void;
  edit(data: ApplicationCommandData): Promise<ApplicationCommand>;
  delete(): Promise<ApplicationCommand>;
  static transformOptions(): ApplicationCommandData;
}

export class GuildApplicationCommandManager extends ApplicationCommandManager {
  protected constructor(guild: Guild);
  get permissions(): ApplicationCommandPermissionsManager;
}

//TODO:説明があり次第追記
export type InteractionData = CommandInteractionData;

export type CacheType = 'cached' | 'raw' | 'present';

export class BaseInteraction<Cached extends CacheType = CacheType> extends Base {
  protected constructor(client: Client, data: InteractionData);
  private readonly _cacheType: Cached;
  public type: InteractionTypes;
  public id: Snowflake;
  public readonly token: string;
  public applicationId: Snowflake;
  public guildId: Snowflake | null;
  public channelId: Snowflake | null;
  public userId: Snowflake | null;
  //TODO: ApplicationCommandAuthorかこれか明確に
  public author: InteractionAuthor;
  public webhook: ExtendedWebhookClient;
  public version: number;
  public reply: Reply;
  //TODO: ほかにもあるのでは
  get channel(): TextChannel | null;
  get guild(): Guild | null;
  inGuild(): this is BaseInteraction<"present">;
  inCachedGuild(): this is BaseInteraction<"cached">;
  inRawGuild(): this is BaseInteraction<"raw">;
  isCommand(): this is CommandInteraction<Cached>;
  isButton(): this is ButtonInteraction<Cached>;
  isSelectMenu(): this is SelectMenuInteraction<Cached>;
}

export class CommandInteraction<Cached extends CacheType = CacheType> extends BaseInteraction<Cached> {
  protected constructor(client: Client, data: InteractionData);
  public commandId: Snowflake;
  public commandName: string;
  public deferred: boolean;
  public replied: boolean;
  public isEphemeral: boolean;
  get command(): ApplicationCommand;
}

export class InteractionAuthor extends Base {
  protected constructor(client: Client, interaction: BaseInteraction | CommandInteraction);
  public interaction: BaseInteraction | CommandInteraction;
  public user: User;
  public member: GuildMember;
  fetch(): Promise<InteractionAuthor>;
}

export class Reply extends Base {
  protected constructor(client: Client, interaction: CommandInteraction, webhook: Webhook);
  public deferred: boolean;
  public replied: boolean;
  public isEphemeral: boolean | undefined;

  send(content: StringResolvable | APIMessage, options: boolean): Promise<Reply>;

  edit(content: StringResolvable | APIMessage, options: unknown): Promise<Reply>;

  send(content: StringResolvable | APIMessage, options: boolean): Promise<Reply>;

  defer(ephemeral: boolean): Promise<Reply>;
  think(ephemeral: boolean): Promise<Reply>;

  fetch(): Promise<Message | APIMessage>;
  
  delete(): Promise<Reply>;
}

export class ExtendedWebhookClient extends WebhookClient {
  sendMessage(content: StringResolvable | APIMessage, options: unknown): Promise<void>;
  editMessage(message: string, content: StringResolvable | APIMessage, options: unknown): Promise<APIMessage>;
  deleteMessage(message: string): Promise<void>;
  fetchMessage(message: string): Promise<APIMessage>;
}

