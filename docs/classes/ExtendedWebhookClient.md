# ExtendedWebhookClient  
  
**Extends: [WebhookClient](https://discord.js.org/#/docs/main/v12/class/WebhookClient)**  

## Constructor  
name|type|description  
---|---|---  
id|[Snowflake](https://discord.js.org/#/docs/main/v12/typedef/Snowflake)|id of webhook  
token|string|token of webhook  
options|[ClientOptions](https://discord.js.org/#/docs/main/v12/typedef/ClientOptions)|options of client  

## Methods  
**editMessage, deleteMessage, fetchMessage, sendMessage**  

## editMessage  
**Arguments**  
name|type|description  
---|---|---  
message|[MessageResolvable](https://discord.js.org/#/docs/main/v12/typedef/MessageResolvable)|-  
content|[StringResolvable](https://discord.js.org/#/docs/main/v12/typedef/StringResolvable)|content of message    
options|[MessageOptions](https://discord.js.org/#/docs/main/v12/typedef/MessageOptions)|options of message  
  
**Returns: [message-object](https://canary.discord.com/developers/docs/resources/channel#message-object)**  

## deleteMessage  
**Arguments**  
name|type|description  
---|---|---  
message|[MessageResolvable](https://discord.js.org/#/docs/main/v12/typedef/MessageResolvable)|-  
  
**Returns: boolean**  

## fetchMessage  
**Arguments**  
name|type|description  
---|---|---  
message|[MessageResolvable](https://discord.js.org/#/docs/main/v12/typedef/MessageResolvable)|-  
  
**Returns: [message-object](https://canary.discord.com/developers/docs/resources/channel#message-object)**  

## sendMessage  
**Arguments**  
name|type|description  
---|---|---  
content|[MessageResolvable](https://discord.js.org/#/docs/main/v12/typedef/MessageResolvable)  
options|[MessageOptions](https://discord.js.org/#/docs/main/v12/typedef/MessageOptions)  
  
**Returns: [message-object](https://canary.discord.com/developers/docs/resources/channel#message-object)**  