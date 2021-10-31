# ApplicationCommandData  
  
**Type: object**  

**The data ofapplication commands**  

## Constructor  
name|type|description  
---|---|---  
applicationId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of application  
default_permission|boolean|whether everyone can use command  
guildId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of guild   
id|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of command  
options|Array<[ApplicationCommandOptions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandOptions.md)>|options of command  
type|[ApplicationCommandTypes](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandTypes.md)|type of command  
version|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|version of command  