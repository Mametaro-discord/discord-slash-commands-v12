# ApplicationCommandOptions  
  
**Type: object**  
  
**option of application commands**  

## Properties  
name|type|description  
---|---|---  
autocomplete|boolean|enable autocomplete  
channel_types|Array<[ChannelTypes](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ChannelTypes.md)>|type of channel  
choices|[ApplicationCommandOptionsChoices](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandOptionsChoices.md)|choices of option  
description|string|description of option  
name|string|name of option  
options|Array<[ApplicationCommandOptions](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandOptions.md)>|options of options(sub_command)  
required|boolean|required or optional  
type|[ApplicationCommandOptionsTypes](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/types/ApplicationCommandOptionsTypes.md)|type of option of command  