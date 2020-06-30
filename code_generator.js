const file_system = require("fs")

// YHAWEL MEL ABSTRACT SYNTAX TREE LEL .HTML
function generate(ast,feazy_project, feazy_file_css){
    var result = new Array()
    switch(ast.type){

    case "head":
        var code = ""
        if(ast.sub_tags != []){
            for (var i = 0; i<ast.sub_tags.length; i++){
                code = code + " " + generate(ast.sub_tags[i])
            }   
        }
        result[0] = 
        "<head>\n"
        + code +
        "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + feazy_file_css.substr(feazy_file_css.lastIndexOf("/") + 1,1000) + "\">\n" +
        "\n</head>\n"
    break

    case "head_tag":
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
        var html_att = html.join(" ").toString()
       
            if(html_att == ""){
                result[0] =
                "<" + String(ast.tagname) + ">\n"
                + content +
                "\n</" + String(ast.tagname) + ">\n" 
            }else{
                if (content != ""){
                result[0] =
                "<" + String(ast.tagname) + " " + html_att + ">\n"
                + content +
                "\n</" + String(ast.tagname) + ">\n"
                }else{
                result[0] =    
                    "<" + String(ast.tagname) + " " + html_att + " />\n"
                }
            }
        
    break

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
        var css_att = css.join(";\n ").toString()
        var html_att = html.join(" ").toString()

        var code = ""
        var code_css = ""
        if(ast.sub_tags != []){
            for (var i = 0; i<ast.sub_tags.length; i++){
                code = code + " " + generate(ast.sub_tags[i])[0]
                code_css = code_css + generate(ast.sub_tags[i])[1]
            }   
        }
        if (css_att == ""){
            result[1] = code_css
        }
        if (css_att != ""){
        
        result[1] = "." + String(ast.class) + " {\n" + css_att + "\n}\n\n" + code_css + "\n"
        
        result[0] = 
        "<" + String(ast.tagname) + " class=\"" + String(ast.class) + "\" " + html_att + ">\n"
        + content
        + code +
        "\n</" + String(ast.tagname) + ">\n"
        }else{
            if(html_att == ""){
                result[0] =
                "<" + String(ast.tagname) + " class=\"" + String(ast.class) + "\">\n"
                + content 
                + code +
                "\n</" + String(ast.tagname) + ">\n" 
            }else{
                result[0] =
                "<" + String(ast.tagname) + " class=\"" + String(ast.class) + "\" " + html_att + ">\n"
                + content
                + code +
                "\n</" + String(ast.tagname) + ">\n"
            }
        }
    break
        
    case "comment":
        result[0] = "<!-- " + ast.text + " --> \n"
    break

    case "js":
        result[0] = "<script> " + ast.code + " </script>\n"
    break

    case "php":
        result[0] = "<?php " + ast.code + " ?>\n"
    break

    case "html":
        result[0] = ast.code + "\n"
    break
    
    case "css":
        result[1] = String(ast.code).replace(";",";\n").replace("{","{\n") + "\n\n"
    break

    case "include":
        if(feazy_project[feazy_project.length-1] == "/"){
            var included = feazy_project + String(ast.link).substr(0,String(ast.link).length-2) + "html"
        }else{
            var included = feazy_project + "/" + String(ast.link).substr(0,String(ast.link).length-2) + "html"
        }
        result[0] = file_system.readFileSync(included, "utf8")
        result[0] = result[0].replace("<html>", "\n<!-- This is your included file: " + ast.link + " -->")
        result[0] = result[0].replace("</html>", "")
    break

    }
    return result
}
module.exports.generate = generate;