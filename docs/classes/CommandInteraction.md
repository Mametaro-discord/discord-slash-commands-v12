# CommandInteraction  
  
**Extends: [BaseInteraction](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/BaseInteraction.md)**  
  
**The command interaction**  
  
## Constructor  
name|type|description  
---|---|---  
client|[Client](https://discord.js.org/#/docs/main/v12/classes/Client)|discord client  
data|[InteractionData](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/InteractionData.md)  

## Properties  
name|type|description  
---|---|--- 
command|[ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)|command of interaction  
commandId|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of command  
commandName|string|name of command  
deferred|boolean|whether interaction is deferred  
isEphemeral|boolean|whether interaction's reply is ephemeral  
replied|boolean|whether interaction is replied  