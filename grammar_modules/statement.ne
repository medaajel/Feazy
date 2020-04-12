statement -> tagname __ class _ "{" _ instructions:* _ statement:* _ "}" _ ";" _
            {%
            d => {
                return {
                    type:"tag",
                    tagname: d[0],
                    class: d[2],
                    instructions: d[6],
                    sub_tags: d[8]
                }
            }
            %}
        | tagname _ "{" _ instructions:* _ statement:* _ "}" _ ";"
            {%
            d => {
                return {
                    type:"tag",
                    tagname: d[0],
                    instructions: d[4],
                    sub_tags: d[6]
                }
            }
            %}

instructions -> attribut _ [=|:] _ value_with_unity _ ";" _
            {% 
            d => { switch(d[2]){
                case "=": return(("html(" + d[0] + "=" + d[4] + ")").toString())
                case ":": return(("css(" + d[0] + ":" + d[4] + ")").toString())
            }
            }
            %}

tagname ->  [$] [a-zA-Z0-9_]:+ {% d => d[0] + d[1].join("") %}
attribut -> [a-zA-Z0-9_-]:+ {% d => d[0].join("") %}
class -> [.] [a-zA-Z0-9_]:+ {% d => d[0] + d[1].join("") %}
value_with_unity -> [#A-Za-z0-9_-]:+  {% d => d[0].join("") %}
                | [0-9]:+  _ ("px"|"rem"|"pt"|"%") {% d => d[0].join("") + d[2] %}
                | string
