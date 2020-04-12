const line_reader = require('line-reader'), promise = require('bluebird');
var file_system = require('fs');

// FUNCTION TNADHEF LFICHIER LI BSH YA9RAHA O Y9ASEMHA LSTOURA HASB SEMI-COLON
function prepare(feazy_file){
var file = feazy_file + "a"
var left_brackets = 0
var right_brackets = 0
var sub_line = null

file_system.writeFile(file,"",function(){console.log('Content removed!\n')})

line_reader.eachLine(feazy_file, function(line) {
    
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

// YKHAREJ LES BALISES LI FIWAAST BAADHHOM BSH NAJEM NPARSIHOM MBAAD
// HEDHI TAANDHIFA LOULA BSH NHAWLOUHOM LEL TABLE
var file = "./index.fza"
var sub_statements = new Array()

var eachLine = promise.promisify(line_reader.eachLine);
eachLine(file, function(line) {

while(line[0] == "\s"){
    line = line.substr(0,1)
}

if (line[0] == "$"){
    line = line.replace(/\s\s+/g, ' ');
    while(line.indexOf("$", line.indexOf("$") + 1) != -1){
        var i = line.indexOf("$", line.indexOf("$") + 1)
        var j = 1 + line.indexOf("{", i + 1)
        var k = j
        var v = 1
        while(v > 0){
            if (line[j] == "{"){
                v = v + 1
            }
            if (line[j] == "}"){
                v = v - 1
            }
            j++
        }
        if(j-i > 0){
            var sub = line.substr(i,j-i) + ";"
            line = line.replace(sub, "")
            sub_statements.push(sub)
        }
    }
}

// TAW BSH NADHFOUHOM LKOL O N9ASSMOUHOM DES ELEMENTS F TABLE
}).then(function() {
    do{
    var verify = 0
    for(var counter = 0; counter < sub_statements.length; counter++){
        while(sub_statements[counter].indexOf("$", sub_statements[counter].indexOf("$") + 1) != -1){
            var i = sub_statements[counter].indexOf("$", sub_statements[counter].indexOf("$") + 1)
            var j = 1 + sub_statements[counter].indexOf("{", i + 1)
            var v = 1
            while(v > 0){
                if (sub_statements[counter][j] == "{"){
                    v = v + 1
                }
                if (sub_statements[counter][j] == "}"){
                    v = v - 1
                }
                j++
            }
            if(j-i > 0){
                var sub = sub_statements[counter].substr(i,j-i) + ";"
                sub_statements[counter] = sub_statements[counter].replace(sub, "")
                sub_statements.push(sub)
            }
        }
        if (sub_statements[counter].split("$").length - 1 == 1){
            verify++
        }
    }

    }while(verify < sub_statements.length - 1)
  })
