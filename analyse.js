const line_reader = require('line-reader');
var file_system = require('fs');
var promise = require('bluebird')


// FUNCTION TNADHEF LFICHIER .FZ O YAATINA ANALYSED FILE .FZA
var prepare = async function prepare(feazy_file){
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

    // YNADHEEF LES ESPACES O NEW LINES O ZEUU
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
    file_system.writeFile(feazy_file_var,"",function(){})
    var eachLine = promise.promisify(line_reader.eachLine)
    eachLine(feazy_file + "a", function(line) {
        
        if((line[0] == "@" || line.indexOf("new") == 0) && line.indexOf("include") == -1 ){
                variables[line.match(/@[a-zA-Z0-9_]+/g)] = line.substr(line.indexOf("=")+1, (line.length - line.indexOf("=")) - 2).replace(/\s+/g,'')
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

module.exports.prepare = prepare;