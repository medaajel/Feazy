
const nearley = require("nearley");
const grammar = require("./grammar.js")
const gen = require("./generate.js")
const util = require('util')
const line_reader = require('line-reader')
var file_system = require('mz/fs')
var promise = require('bluebird')




function parser_line(line,json_file, json_table){
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    try{
        parser.feed(line);
    file_system.appendFileSync(json_file, JSON.stringify(parser.results[0], null, 1))
    json_table.push(JSON.stringify(parser.results[0], null, 1))
    }catch(e){
        console.log(e.message)
    }
}

var parser_gen = async function (fza){
    var json_table = []
    var json_file = fza.substr(0,fza.length-4) + ".json"
    file_system.writeFile(json_file,"")
    var eachLine = promise.promisify(line_reader.eachLine)
    await eachLine(fza, function(line) {
        parser_line(line,json_file, json_table)
        file_system.appendFileSync(json_file, "\n")
    })
    return json_table
}


function format(html) {
    var tab = '\t';
    var result = '';
    var indent= '';

    html.split(/>\s*</).forEach(function(element) {
        if (element.match( /^\/\w/ )) {
            indent = indent.substring(tab.length);
        }

        result += indent + '<' + element + '>\r\n';

        if (element.match( /^<?\w[^>]*[^\/]$/ )) { 
            indent += tab;              
        }
    });

    return result.substring(1, result.length-3);
}

parser_gen("./index.fzv").then((json_table) => {

file_system.writeFile("index.html","")
for (var i=0; i<json_table.length; i++){
    const content = (json_table[i].toString())
    const ast = JSON.parse(content)
    const result = gen.generate(ast)
    if (result != null && result != ""){
        file_system.appendFileSync("index.html",format(result))
    }
}

})