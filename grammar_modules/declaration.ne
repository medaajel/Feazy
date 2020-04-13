declaration -> "new" __ identifier _ "=" _ value _ ";"
            {%
            d => ({
                type:"declaration",
                identifier:d[2],
                value:d[6]
            })
            %}
            | "new" __ identifier _ ";"
            {%
            d => ({
                type:"declaration",
                identifier:d[2],
                value:null
            })
            %}