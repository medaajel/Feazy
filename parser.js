
const nearley = require("nearley");
const grammar = require("./grammar.js")
const gen = require("./code_generator.js")
const util = require('util')
const line_reader = require('line-reader')
var file_system = require('mz/fs')
var promise = require('bluebird')
var colors = require('colors');
var detector = require('./detector.js')

// HEDHI FUNCTION TEKHEDH LIGNE O TPARSIIIII
function instruction_parser(feazy_file, line,json_file, json_table, file){
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

        try{
        parser.feed(line);
    file_system.appendFileSync(json_file, JSON.stringify(parser.results[0], null, 1))
    json_table.push(JSON.stringify(parser.results[0], null, 1))
        }catch(err){
            sub = line.substring(err.offset, line.indexOf(" "))
            index = file.indexOf(sub)
            tempString = file.substring(0, index)
            l = tempString.split("\n").length
            detector.fastDetect(err,l)
            process.exit();
        }
}

// HEDHI TPARSI FICHIER .FZV O TRAAJA3NA FICHIER .JSON I TABLEAU FIHA L'OBJECTS LKOL
var code_parser = async function (fzv){
    let file = file_system.readFileSync(fzv,"utf8")
    fz = fzv
    fzv = fzv + "v"
    var json_table = []
    var json_file = fzv.substr(0,fzv.length-4) + ".json"
    file_system.writeFile(json_file,"")
    var eachLine = promise.promisify(line_reader.eachLine)
    await eachLine(fzv, function(line) {
        instruction_parser(fz, line,json_file, json_table, file)
        file_system.appendFileSync(json_file, "\n")
    })
    console.log(fzv.green.bold, "| AST Generated and JSON files created.".yellow)
    return json_table
}

// TNADHEM LES FICHIER HTML
function format(html, feazy_file) {
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
code_parser(feazy_file).then(async(json_table) => {
var feazy_file_html =  feazy_file.substr(0,feazy_file.length-2) + "html"
var feazy_file_css =  feazy_file.substr(0,feazy_file.length-2) + "css"
await file_system.writeFile(feazy_file_html,"<html>\n")
await file_system.writeFile(feazy_file_css,"")
for (var i=0; i<json_table.length; i++){
    if (json_table[i] != null && json_table[i] != ""){
    const content = (json_table[i].toString())
    const ast = JSON.parse(content)
    var result = await gen.generate(ast,feazy_project, feazy_file_css)
    if (result[1] != null && result[1] != ""){
        await file_system.appendFileSync(feazy_file_css,result[1])
    }
    if (result[0] != null && result[0] != ""){
        await file_system.appendFileSync(feazy_file_html,format(result[0], feazy_file))
    }
    }
}
file_system.appendFileSync(feazy_file_html,"</html>")
file_system.unlinkSync(feazy_file + "a")
file_system.unlinkSync(feazy_file + "v")
file_system.unlinkSync(feazy_file.substring(0,feazy_file.length-2) + "json")
console.log(feazy_file.green.bold, "| HTML and CSS files generated and formatted.".yellow)
console.log(feazy_file.green.bold, "| Transpiled successfully :)".green)
})
}

module.exports.parse = parse;