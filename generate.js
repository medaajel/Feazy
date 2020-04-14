
// YHAWEL MEL ABSTRACT SYNTAX TREE LEL HTML
function generate(ast){
    var result
    switch(ast.type){

    case "tag":
        if (ast.instructions != []){
            var instructions = ast.instructions
            var html = new Array()
            var css = new Array()
            for (var i = 0; i<=instructions.length-1; i++){
                if (instructions[i].indexOf("=") != -1){
                    instructions[i] = instructions[i].replace("=","=\"")
                    instructions[i] = instructions[i] + "\""
                    html.push(instructions[i])
                }else{
                    instructions[i] = instructions[i] + ";" 
                    css.push(instructions[i])
                }
            }
        }
        var css_att = css.join("; ").toString()
        var html_att = html.join(" ").toString()
        var code = ""
        if(ast.sub_tags != []){
            for (var i = 0; i<ast.sub_tags.length; i++){
                code = code + " " + generate(ast.sub_tags[i])
            }   
        }
        if (css_att != []){
        result =
        "<" + String(ast.tagname) + " class=\"" + String(ast.class) + "\" " + "style=\"" + css_att  + "\" " + html_att + ">\n"
        + code +
        "\n</" + String(ast.tagname) + ">\n"
        }else{
            result =
            "<" + String(ast.tagname) + " class=\"" + String(ast.class) + "\" " + html_att + ">\n"
            + code +
            "\n</" + String(ast.tagname) + ">\n"
        }
        break

    case "comment":
        result = "<!-- " + ast.text + " --> \n"
        break

    case "js":
        result = "<script> " + ast.code + " </script>\n"
        break

    case "php":
        result = "<?php " + ast.code + " ?>\n"
        break
    }
    return result
}
module.exports.generate = generate;