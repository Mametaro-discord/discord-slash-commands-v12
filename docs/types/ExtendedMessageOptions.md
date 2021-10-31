# ExtendedMessageOptions  
  
**Type: object**  

**Extends: [MessageOptions](https://discord.js.org/#/docs/main/v12/typedef/MessageOptions)**  

## Properties  
name|type|description  
---|---|---  
allowedMentions|[MessageMentionOptions](https://discord.js.org/#/docs/main/v12/typedef/MessageMentionOptions)|-  
code|string\|\|boolean|-  
content|string|-  
disableMentions|[DisableMentionType](https://discord.js.org/#/docs/main/v12/typedef/DisableMentionType)|-    
embed|[MessageEmbed](https://discord.js.org/#/docs/main/v12/classes/MessageEmbed)|-  
embeds|Array<[MessageEmbed](https://discord.js.org/#/docs/main/v12/classes/MessageEmbed)>|-  
files|Array<[BufferResolvable](https://discord.js.org/#/docs/main/v12/typedef/BufferResolvable)>\|\|Array<[FileOptions](https://discord.js.org/#/docs/main/v12/typedef/FileOptions)>|-  
flags|number|flags of message
nonce|string|-  
reply|[UserResolvable](https://discord.js.org/#/docs/main/v12/typedef/UserResolvable)|-  
split|boolean\|\|[SplitOptions](https://discord.js.org/#/main/v12/typedef/SplitOptions)|-  
tts|boolean|-  