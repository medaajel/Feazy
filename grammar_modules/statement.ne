
@include "./tagname.ne"

statement -> "$" tagname __ class _ "{" _ instructions:* _ statement:* _ "}" _ ";" _
            {%
            d => {
                return {
                    type:"tag",
                    tagname: d[1],
                    class: d[3],
                    instructions: d[7],
                    sub_tags: d[9]
                }
            }
            %}
        | "$head" _ "{" _ statement:* _ "}" _ ";" _
        {%
        d => {
                return {
                    type:"head",
                    sub_tags: d[4],
                }
            }
        %}
        | "$" tagname _ "{" _ instructions:* _ "}" _ ";" _
        {%
        d => {
                return {
                    type:"head_tag",
                    tagname: d[1],
                    instructions: d[5],
                }
            }
        %}


instructions -> attribut _ [=|:] _ value_with_unity _ ";" _
            {% 
            d => { switch(d[2]){
                case "=": return(( d[0] + "=" + d[4]).toString())
                case ":": return((d[0] + ":" + d[4]).toString())
            }
            }
            %}

attribut -> [a-zA-Z0-9_-]:+ {% d => d[0].join("") %}
class -> [.] [a-zA-Z0-9_]:+ {% d => d[1].join("") %}
value_with_unity -> identifier _  ("px"|"rem"|"pt"|"%") {% d => d[0] + d[2]%}
                | identifier
                | [0-9]:+  _ ("px"|"rem"|"pt"|"%") {% d => d[0].join("") + d[2] %}
                | string {% id %}
                | expression  _ ("px"|"rem"|"pt"|"%") {% d => d[0] + d[2] %}
                | "#" [0-9A-Fa-f]:+ {% d => d[0] + d[1].join("") %}