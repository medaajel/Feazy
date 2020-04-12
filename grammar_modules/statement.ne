statement -> _ tagname __ class _ "{" _ instructions:* _ statement:* _ "}" _
            {%
            data => {
                return {
                    tagname: data[1],
                    class: data[3],
                    instructions: data[7].join("")
                }
            }
            %}

instructions -> _ attribut _ [=|:] _ value _
            {% 
            data => { switch(data[3]){
                case "=": return(("html(" + data[1] + "=" + data[5] + ")").toString())
                case ":": return(("css(" + data[1] + ":" + data[5] + ")").toString())
            }
            }
            %}

tagname ->  [#] [a-zA-Z0-9_]:+ {% data => data[0] + data[1].join("") %}
attribut -> [a-zA-Z0-9_]:+ {% data => data[0].join("") %}
class -> [.] [a-zA-Z0-9_]:+ {% data => data[0] + data[1].join("") %}
value -> [a-zA-Z0-9_]:+ {% data => data[0].join("") %}