expression -> _ AS _ {% data => {return data[1]; } %}

P -> "(" _ AS _ ")" {% data => {return data[2]; } %}
    | N             {% id %}


E -> P _ "^" _ E    {% data => {return Math.pow(data[0], data[4]); } %}
    | P             {% id %}

MD -> MD _ "*" _ E  {% data => {return data[0]*data[4]; } %}
    | MD _ "/" _ E  {% data => {return data[0]/data[4]; } %}
    | E             {% id %}

AS -> AS _ "+" _ MD {% data => {return data[0]+data[4]; } %}
    | AS _ "-" _ MD {% data => {return data[0]-data[4]; } %}
    | MD            {% id %}

N -> float          {% id %}
    | "sin" _ P     {% data => {return Math.sin(data[2]); } %}
    | "cos" _ P     {% data => {return Math.cos(data[2]); } %}
    | "tan" _ P     {% data => {return Math.tan(data[2]); } %}
    
    | "asin" _ P    {% data => {return Math.asin(data[2]); } %}
    | "acos" _ P    {% data => {return Math.acos(data[2]); } %}
    | "atan" _ P    {% data => {return Math.atan(data[2]); } %}

    | "pi"          {% data => {return Math.PI; } %}
    | "e"           {% data => {return Math.E; } %}
    | "sqrt" _ P    {% data => {return Math.sqrt(data[2]); } %}
    | "ln" _ P      {% data => {return Math.log(data[2]); }  %}

float ->
      int "." int   {% data => {return parseFloat(data[0] + data[1] + data[2])} %}
	| int           {% data => {return parseInt(data[0])} %}

int -> [0-9]:+        {% data => {return data[0].join(""); } %}

