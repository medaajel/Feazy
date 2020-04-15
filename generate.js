const file_system = require("fs")

// YHAWEL MEL ABSTRACT SYNTAX TREE LEL .HTML
function generate(ast,feazy_project){
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
        var content = ""
        for(var i=0; i<html.length;i++){
            if(html[i].indexOf("content=") != -1){
                content = (html[i].substr(8)).substr(1,html[i].length-10)
                html.splice(i,1)
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
        if (css_att != ""){
        result =
        "<" + String(ast.tagname) + " class=\"" + String(ast.class) + "\" " + "style=\"" + css_att  + "\" " + html_att + ">\n"
        + content
        + code +
        "\n</" + String(ast.tagname) + ">\n"
        }else{
            if(html_att == ""){
                result =
                "<" + String(ast.tagname) + " class=\"" + String(ast.class) + "\">\n"
                + content 
                + code +
                "\n</" + String(ast.tagname) + ">\n" 
            }else{
                result =
                "<" + String(ast.tagname) + " class=\"" + String(ast.class) + "\" " + html_att + ">\n"
                + content
                + code +
                "\n</" + String(ast.tagname) + ">\n"
            }
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

    case "html":
        result = ast.code + "\n"
    break
    
    case "include":
        if(feazy_project[feazy_project.length-1] == "/"){
            var included = feazy_project + String(ast.link).substr(0,String(ast.link).length-2) + "html"
        }else{
            var included = feazy_project + "/" + String(ast.link).substr(0,String(ast.link).length-2) + "html"
        }
        result = file_system.readFileSync(included, "utf8")
    break

    }
    return result
}
module.exports.generate = generate;