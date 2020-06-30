assignment -> identifier _ "=" _ value _ ";"
            {%
            d => ({
                type:"assignment",
                identifier:d[0],
                value:d[4]
            })
            %}
            