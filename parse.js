
const nearley = require("nearley");
const grammar = require("./grammar.js")
const gen = require("./generate.js")
const util = require('util')
const line_reader = require('line-reader')
var file_system = require('mz/fs')
var promise = require('bluebird')



// HEDHI FUNCTION TEKHDEKH LIGNE O TPARSIIIII
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

// HEDHI TPARSI FICHIER .FZV O TRAAJA3NA FICHIER .JSON I TABLEAU FIHA L'OBJECTS LKOL
var parser_gen = async function (fzv){
    fzv = fzv + "v"
    var json_table = []
    var json_file = fzv.substr(0,fzv.length-4) + ".json"
    file_system.writeFile(json_file,"")
    var eachLine = promise.promisify(line_reader.eachLine)
    await eachLine(fzv, function(line) {
        parser_line(line,json_file, json_table)
        file_system.appendFileSync(json_file, "\n")
    })
    return json_table
}

// TNADHEM LES FICHIER HTML
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

// LMAIN FUNCTION LI TKALEM GENERATE BSH TRAJ3EELNA LFICHIER .HTML
function parse(feazy_file,feazy_project){
parser_gen(feazy_file).then(async(json_table) => {
var feazy_file_html =  feazy_file.substr(0,feazy_file.length-2) + "html"
file_system.writeFile(feazy_file_html,"")
for (var i=0; i<json_table.length; i++){
    if (json_table[i] != null && json_table[i] != ""){
    const content = (json_table[i].toString())
    const ast = JSON.parse(content)
    const result = await gen.generate(ast,feazy_project)
    if (result != null && result != ""){
        file_system.appendFileSync(feazy_file_html,format(result))
    }
    }
}

})
}

module.exports.parse = parse;