string -> "\"" characters "\""
    {%
    (data) => ("\"" + data[1] + "\"").toString()
    %}

characters
    -> character {% id %}
    | character characters 
    {% (data) => data[0] + data[1]%}

character -> [^/"] {% id %}

number -> expression

bool
    -> "true" {% data => "b#" + data[0] %}
    | "false" {% data => "b#" + data[0] %}
