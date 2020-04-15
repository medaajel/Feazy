js_and_php -> "#js"  _ special_characters _ "#js"
            {%
            d => {
               return{
                   type:"js",
                   code:d[2]
               } 
            }
            %}
        | "#php" _ special_characters _ "#php"
            {%
            d => {
               return{
                   type:"php",
                   code:d[2]
               } 
            }
            %}
        | "#html" _ special_characters _ "#html"
            {%
            d => {
               return{
                   type:"html",
                   code:d[2]
               } 
            }
            %}
special_characters -> ( character | [/";] ):+ {% d => d[0].join("") %}