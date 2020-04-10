
variable_declaration -> "@" variable_name _ | "@" variable_name _ "=" _ variable_value {%
data => {
    return {
        variable_name:data[1],
        variable_value:data[5]
    }
}
%}
variable_name -> [a-zA-Z0-9]:+ {% data => data[0].join("") %}
variable_value -> [a-zA-Z0-9]:+ {% data => data[0].join("") %}
_ -> [ ]:*