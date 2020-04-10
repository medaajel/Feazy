
declaration 
    -> _ "new" _ "@" identifier _ 
         {% data => {
    return {
        type:"declaration",
        identifier:data[4],
        value:"null"
        }
    }
    %}
    | _ "new" _ "@" identifier _ "=" _ value _
     {% data => {
    return {
        type:"declaration",
        identifier:data[4],
        value:data[8]
        }
    }
    %}

identifier -> [a-zA-Z0-9]:+ {% data => data[0].join("") %}
value -> string
    | number
    | expression
    | bool {% id %}