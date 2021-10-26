# ApplicationCommandManager  
  
**Extends: [BaseManager](https://discord.js.org/#/docs/main/v12/class/BaseManager)**  
  
**The manager of application commands**  

## Constructor  
name|type|description  
---|---|---  
client|[Client](https://discord.js.org/#/docs/main/v12/class/Client)  

## Properties  
name|type|description  
---|---|---  
permissions|[ApplicationCommandPermissionsManager](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommandPermissionsManager.md)|permissions of application commands  

## Methods  
**create, edit, delete, fetch, set**  

#### create  
**Arguments**  
name|type|description  
---|---|---  
data|[ApplicationCommandManager]|data of command  
guildId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of guild that regist application command regist to  
  
**Return: [ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)**  

## edit  
**Arguments**  
name|type|description  
---|---|---  
commandId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of application command  
data|[ApplicationCommandData]()|data of application command
guildId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of the guild of the application command  
  
**Return: [ApplicationCommand](https://github.com/Mametaro-discord-discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)**  

## delete  
**Arguments**  
name|type|description  
---|---|---  
commandId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of application command  
guildId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of the guild of the application command  
  
**Return: [ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)**  

## fetch  
**Arguments**  
name|type|description  
---|---|---  
options|[ApplicationCommandFetchOptions]()|options of fetching the application command(s)  
  
**Return: [ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)||[ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)[]**  

## set  
**Arguments**  
name|type|description  
---|---|---  
commands|[ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)[]|array of data of application command  
guildId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of the guild the application commands  
  
**Return: [ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)[]**  