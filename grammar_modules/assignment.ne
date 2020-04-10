assignment -> "@" assignment_identifier "=" assignment_value 
         {% data => {
            return {
                assignment_identifier:data[1],
                assignment_value:data[5]
                }}
        %}

assignment_value -> [a-zA-Z0-9]:+ {% data => data[0].join("") %}
assignment_identifier -> [a-zA-Z0-9]:+ {% data => data[0].join("") %}