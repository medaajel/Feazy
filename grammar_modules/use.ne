use -> "@use(" link ")" _ ";"
        {%
        d => ({
            type:"use",
            link: d[1]
        })
        %}

link -> string {% id %}
    | identifier {% id %}