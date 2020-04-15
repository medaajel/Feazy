include -> "@include(" link ")" _ ";"
        {%
        d => ({
            type:"include",
            link: d[1]
        })
        %}

link -> characters {% id %}
    | identifier {% id %}