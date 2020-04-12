assignment -> "@" identifier _ "=" _ value _ ";"
            {%
            d => ({
                type:"assignment",
                identifier:d[1],
                value:d[5]
            })
            %}
            