assignment -> _ "@" identifier _ "=" _ value _
         {% data => {
            return {
                type:"assignment",
                identifier:data[2],
                value:data[6]
                }}
        %}

value -> number 
                | string 
                | expression
                | bool {% id %}
identifier -> [a-zA-Z0-9]:+ {% data => data[0].join("") %}