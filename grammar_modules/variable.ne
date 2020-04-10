
variable_declaration 
    -> _ "@" declaration_identifier _ 
         {% data => {
    return {
        declaration_identifier:data[2],
        declaration_variable_value:"null"
        }
    }
    %}
    |_ "@" declaration_identifier _ "=" _ declaration_variable_value _
     {% data => {
    return {
        declaration_identifier:data[2],
        declaration_variable_value:data[6]
        }
    }
    %}
    |_ "@" declaration_identifier _ "=" _ expression _
     {% data => {
    return {
        declaration_identifier:data[2],
        declaration_variable_value:data[6]
        }
    }
    %}
declaration_identifier -> [a-zA-Z0-9]:+ {% data => data[0].join("") %}
declaration_variable_value -> [a-zA-Z0-9]:+ {% data => data[0].join("") %}
