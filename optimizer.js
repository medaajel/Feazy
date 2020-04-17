const line_reader = require('line-reader');
var file_system = require('fs');
var promise = require('bluebird')


// FUNCTION TNADHEF LFICHIER .FZ O YAATINA ANALYSED FILE .FZA
var optimize = async function optimize(feazy_file, feazy_project){
var file = feazy_file + "a"
var left_brackets = 0
var right_brackets = 0
var sub_line = null

file_system.writeFile(file,"",function(){})

var ext_code = 0 // LEL VERIFICATION MTE3 PHP O JS
var eachLine = promise.promisify(line_reader.eachLine)
    eachLine(feazy_file, function(line) {

    line = line.trim()
    line = line.replace(/\s\s+/g, ' ')

    // FAZET EL BLOC JAVASCRIPT WALLA PHP WALLA HTML
    if (line.indexOf("#css") != -1 && ext_code == 0){
        if (line.indexOf("#css",line.indexOf("#css")+1) == -1){
        ext_code = 1
        }else{
            file_system.appendFileSync(file, line + "\n")
            ext_code = 2
        }
    }else{
    if (line.indexOf("#css") != -1 && ext_code == 1){
        ext_code = 2
        file_system.appendFileSync(file, line + "\n")
    }}

    if (line.indexOf("#html") != -1 && ext_code == 0){
        if (line.indexOf("#html",line.indexOf("#html")+1) == -1){
        ext_code = 1
        }else{
            file_system.appendFileSync(file, line + "\n")
            ext_code = 2
        }
    }else{
    if (line.indexOf("#html") != -1 && ext_code == 1){
        ext_code = 2
        file_system.appendFileSync(file, line + "\n")
    }}

    if (line.indexOf("#js") != -1 && ext_code == 0){
        if (line.indexOf("#js",line.indexOf("#js")+1) == -1){
        ext_code = 1
        }else{
            file_system.appendFileSync(file, line + "\n")
            ext_code = 2
        }
    }else{
    if (line.indexOf("#js") != -1 && ext_code == 1){
        ext_code = 2
        file_system.appendFileSync(file, line + "\n")
    }}

    if (line.indexOf("#php") != -1 && ext_code == 0){
        if (line.indexOf("#php",line.indexOf("#php")+1) == -1){
            ext_code = 1
            }else{
                file_system.appendFileSync(file, line + "\n")
                ext_code = 2
            }
    }else{
    if (line.indexOf("#php") != -1 && ext_code == 1){
        ext_code = 2
        file_system.appendFileSync(file, line + "\n")
    }}

    // YNADHEEF LES ESPACES O NEW LINES
    if (ext_code == 0){
    if((line[0] + line[1]).toString() != "\\\\"){
        var counter = 0
        while(counter < line.length){
            if (line[counter] == "{"){
                left_brackets++
            }else{
                if (line[counter] == "}"){
                    right_brackets++
                }
            }
            
            if (left_brackets == right_brackets && line[counter] == ";"){
                sub_line = line.substr(0,counter+1)
                sub_line = sub_line.replace(/\s\s+/g, ' ');
                sub_line = sub_line.trim()
                file_system.appendFileSync(file, sub_line)
                file_system.appendFileSync(file, "\n")
                line = line.replace(sub_line,"")
            }
            counter++
        }
        if (line != ""){
            line = line.replace(/\s\s+/g, ' ');
            file_system.appendFileSync(file, line)
        }
    }else{
        file_system.appendFileSync(file, line + "\n")
    }
    }else{
        if(ext_code == 1){
            file_system.appendFileSync(file, line + " ")
        }
    }
    if (ext_code == 2){ext_code = 0}
    // HEDHI BSH TAKTEK HKEYET LES VARIABLES O TBADELHOM O TAATINA .FZV
}).then( function(){ 
    var variables = {}
    var feazy_file_var = feazy_file + "v"
    var verify_use = 1
    do{
        var feazy_file_a = file_system.readFileSync(feazy_file + "a", "utf8")
        if(feazy_file_a.indexOf("@use(") == -1){
            verify_use = 0
        }else{
            var used_file_name = feazy_file_a.substr(6,feazy_file_a.indexOf("\")") - 6)
            var used_file_content = file_system.readFileSync(feazy_project + "/" + used_file_name, "utf8")
            var content = feazy_file_a.replace("@use(\"" + used_file_name + "\");", used_file_content);
                file_system.writeFileSync(feazy_file + "a", content)
        }
    }while( verify_use == 1 )
    file_system.writeFile(feazy_file_var,"",function(){})
    var eachLine = promise.promisify(line_reader.eachLine)
    eachLine(feazy_file + "a", function(line) {
        if((line[0] == "@" || line.indexOf("new") == 0) && line.indexOf("include") == -1 &&  line.indexOf("use") == -1){
                variables[line.match(/@[a-zA-Z0-9_]+/g)] = line.substr(line.indexOf("=")+1, (line.length - line.indexOf("=")) - 2).replace(/\s\s+/g,'')
        }else{
        for (var key in variables){
            var replace = new RegExp(key, 'g');
            line = line.replace(replace,variables[key])
        }
        file_system.appendFileSync(feazy_file_var, line + "\n")
        }

    })
})
return new Promise(resolve => {
    setTimeout(() => {
      resolve(feazy_file + "v");
    }, 300);
  })
}

module.exports.optimize = optimize;