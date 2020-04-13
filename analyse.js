const line_reader = require('line-reader');
var file_system = require('fs');

// FUNCTION TNADHEF LFICHIER LI BSH YA9RAHA O Y9ASEMHA LSTOURA HASB SEMI-COLON
function prepare(feazy_file){
var file = feazy_file + "a"
var left_brackets = 0
var right_brackets = 0
var sub_line = null

file_system.writeFile(file,"",function(){})

line_reader.eachLine(feazy_file, function(line) {
    line = line.trim()
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

});
}

prepare("./index.fz")