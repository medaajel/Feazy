statement -> _ tagname _ class _ "{" instruction:* "}"
{%
data => {
    return {
        tagname:data[1],
        class:data[3],
        instructions:data[6]
    }
}
%}

tagname -> characters {% id %}
class -> "." characters {% data => (data[0] + data[1]).toString() %}
instruction
    -> _ attribute _ "=" _ value _
    {%
    data => ("H(" + data[1] + "=" + data[5] + ")").toString().split(" ").join("")
    %}
    | _ attribute _ ":" _ value _
    {%
    data => ("C(" + data[1] + ":" + data[5] + ")").toString().split(" ").join("")
    %}

attribute -> characters {% id %}