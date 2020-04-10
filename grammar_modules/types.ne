string -> "\"" characters "\""
    {%
    (data) => data[1]
    %}

characters
    -> character {% id %}
    | character characters 
    {% (data) => data[0] + data[1]%}

character -> [^/"] {% id %}

number -> expression

bool
    -> "true" {% data => "#" + data[0] %}
    | "false" {% data => "#" + data[0] %}
