# Reply  
  
**Extends: [Base](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Base.md)**  
  
## Constructor  
name|type|description  
---|---|---  
client|[Client](https://discord.js.org/#/docs/main/v12/classes/Client)|discord client  
interaction|[Interaction](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Interaction.md)|-  
webhook|[ExtendedWebhookClient](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ExtendedWebhookClient.md)

## Properties  
name|type|description  
---|---|---  
interaction|[Interaction](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Interaction.md)|-  
deferred|boolean|whether interaction is deferred  
isEphemeral|boolean|whether interaction's reply is ephemeral  
replied|boolean|whether interaction is replied  

## Methods  
**edit, defer, delete, fetch, send, think**  

## edit  
**Arguments**
name|type|description  
---|---|---  
content|string|content of message  
options|[ExtendedMessageOptions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ExtendedMessageOptions.md)|options of message  
  
**Returns: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Reply.md)**  

## defer
**Arguments**  
name|type|description  
---|---|---  
ephemeral|boolean|whether reply is ephemeral  
  
**Returns: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Reply.md)**  

## delete  
**Returns: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Reply.md)**  

## fetch  
**Returns: [Message](https://discord.js.org/#/docs/main/v12/classes/Message)**  

## send  
**Arguments**
name|type|description  
---|---|---  
content|string|content of message  
options|[ExtendedMessageOptions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ExtendedMessageOptions.md)|options of message  
  
**Returns: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Reply.md)**  

## think  
**Arguments**  
name|type|description  
---|---|---  
ephemeral|boolean|whether reply is ephemeral  
  
**Returns: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Reply.md)**  