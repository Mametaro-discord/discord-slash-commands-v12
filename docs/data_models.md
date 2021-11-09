# Data models this package use

## CommandData
prop|type|description|optional|default  
---|---|---|---|---  
name|string|name of command|no|none  
description|string|description of command|no|none  
options|Array\<CommandOptions\>|options of command|yes|none  
default_permission|boolean|whether everyone can use command|yes|true  

## CommandOptions
prop|type|description  
---|---|---  
type|CommandOptionsType|type of option|no|none  
name|string|name of option|no|none  
description|string|description of option|no|none  
required|boolean|whether option is required|yes|false  
choices|Array\<CommandOptionsChoices\>|choices of option|yes|none  
options|Array\<CommandOptions\>|options of subcommand|yes|none  

## CommandOptionsChoices
prop|type|description|optional|default  
---|---|---|---|---  
name|string|name of choice|no|none  
value|string or number|value of choice|no|none  

## CommandOptionsType
**SUB_COMMAND**  
**SUB_COMMAND_GROUP**  
**STRING**  
**INTEGER**  
**BOOLEAN**  
**USER**  
**CHANNEL**  
**ROLE**  
**MENTIONABLE**  