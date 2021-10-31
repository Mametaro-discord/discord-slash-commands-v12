# ApplicationCommand  

**Extends: [Base](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Base.md)**  
  
**The application command structure**  

## Constructor  
name|type|description  
---|---|---  
client|[Client](https://discord.js.org/#/docs/main/v12/class/Client)|discord client  
data|[ApplicationCommandData](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandData.md)|data of application command  
guild|[Guild](https://discord.js.org/#/docs/main/v12/class/Guild)|discord guild  
guildId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of guild  

## Properties  
name|type|description  
---|---|---  
applicationId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of application  
createdAt|[Date](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date)|date command was created  
createdTimestamp|number|timestamp command was created  
guild|[Guild](https://discord.js.org/#/docs/main/v12/class/Guild)|guild of application command  
guildId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of guild of application command  
id|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of application command  
manager|[ApplicationCommandManager](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommandManager.md)\|\|[GuildApplicationCommandManager](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/class/GuildApplicationCommandManager.md)|manager of application command  
permissions|[ApplicationCommandPermissionsManager](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/class/ApplicationCommandPermissionsManager)|manager of permissions of application command  
type|string|type of application command  
version|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|version of command  

## Methods  
**edit, delete**  
  
#### edit  
**Arguments**  
name|type|description  
---|---|---  
data|[CommandData]()|data of application command   
  
**Returns: [ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)**  

#### delete  
**Returns: [ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)**