declaration -> "new" __ "@" identifier _ "=" _ value _ ";"
            {%
            d => ({
                type:"declaration",
                identifier:d[3],
                value:d[7]
            })
            %}
            | "new" __ "@" identifier _ ";"
            {%
            d => ({
                type:"declaration",
                identifier:d[3],
                value:null
            })
            %}