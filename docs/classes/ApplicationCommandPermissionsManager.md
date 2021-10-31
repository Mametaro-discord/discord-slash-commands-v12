# ApplicationCommandPermissionsManager  
  
**Extends [Base](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Base.md)**  
  
**The manager of permissions of application commands**  

## Constructor  
name|type|description  
---|---|---  
manager|[ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)\|\|[ApplicationCommandManager](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommandManager.md)\|\|[GuildApplicationCommandManager](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/GuildApplicationCommandManager.md)|-  

## Properties  
name|type|description  
---|---|---  
manager|[ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)\|\|[ApplicationCommandManager](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommandManager.md)\|\|[GuildApplicationCommandManager](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/GuildApplicationCommandManager.md)|-  
guild|[Guild](https://discord.js.org/#/docs/main/v12/classes/Guild)|discord guild  
guildId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)\|\|null|id of guild  
commandId|[Snowflake](https://discord.js.org/#docs/main/v12/typedef/Snowflake)\|\|command of id  

## Methods  
**add, fetch, has, remove, set**  

## add  
**Arguments**  
name|type|description  
---|---|---  
options|[ApplicationCommandPermissionsAddOptions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissionsAddOptions.md)|-  
  
**Returns: Promise<Array<[ApplicationCommandPermissions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissions.md)>>**  

## fetch  
**Arguments**  
name|type|description  
---|---|---  
options|[ApplicationCommandPermissionsFetchOptions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissionsFetchOptions.md)|-  
  
**Returns: Promise<(Array<[ApplicationCommandPermissions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissions.md)>\|\|Collection<[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake), Array<[ApplicationCommandPermissions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissions.md)>>)>**  

## has  
**Arguments**  
name|type|description  
---|---|---  
options|[ApplicationCommandPermissionsHasOptions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissionsHasOptions.md)|-  
  
**Returns: boolean**  

## remove  
**Arguments**  
name|type|description  
---|---|---  
options|[ApplicationCommandPermissionsRemoveOptions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissionsRemoveOptions.md)|-  
  
**Returns: Promise<Array<[ApplicationCommandPermissions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissions.md)>>**  

## set  
**Arguments**  
name|type|description  
---|---|---  
options|[ApplicationCommandPermissionsSetOptions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissionsSetOptions.md)|-  
  
**Returns: Promise<(Array<[ApplicationCommandPermissions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissions.md)>\|\|Collection<[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake), Array<[ApplicationCommandPermissions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissions.md)>>)>**  