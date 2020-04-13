js_and_php -> "#" "js" _ "{" _ special_characters _ "}" ";"
            {%
            d => {
               return{
                   type:"js code",
                   code:d[5]
               } 
            }
            %}
        | "#" "php" _ "{" _ special_characters _ "}" ";"    
            {%
            d => {
               return{
                   type:"js code",
                   code:d[5]
               } 
            }
            %}

special_characters -> ( character | [/";] ):+ {% d => d[0].join("") %}