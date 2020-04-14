string -> "\"" characters "\""
    {%
    (data) => ("\"" + data[1] + "\"").toString()
    %}

characters
    -> character {% id %}
    | character characters 
    {% (data) => data[0] + data[1]%}

character -> [^/";] {% id %}

float ->
      int "." int   {% data => {return parseFloat(data[0] + data[1] + data[2])} %}
	| int           {% data => {return parseInt(data[0])} %}

int -> [0-9]:+        {% data => {return data[0].join(""); } %}

bool
    -> "true" {% data => "b#" + data[0] %}
    | "false" {% data => "b#" + data[0] %}

value -> string {% id %}
    | characters {% id %}
    | float {% id %}
    | int {% id %}
    | bool {% id %}
    | expression {% id %}
    | identifier {% id %}

identifier -> "@" [a-zA-Z0-9_]:+ {% data => data[0] + data[1].join("") %}