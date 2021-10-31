# ApplicationCommandPermissionsSetOptions  
  
**Type: object**  
  
**The options of set([ApplicationCommandPermissions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissions.md))**  
  
## Properties  
name|type|description  
---|---|---  
guildId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of guild  
commandId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of command  
permissions|Array<[ApplicationCommandPermissions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandPermissions.md)>|-  
fullPermissions|Array<[FullApplicationCommandPermissions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/FullApplicationCommandPermissions.md)>|-  

## checkit  
**\<guildId, commandId, permissions> or \<fullPermissions>**  