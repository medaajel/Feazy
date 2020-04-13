
const nearley = require("nearley");
const grammar = require("./grammar.js");
const util = require('util')
const line_reader = require('line-reader')
var file_system = require('mz/fs')




async function parser_gen(fza){
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    try{
    var json_file = fza.substr(0,fza.length-4) + ".json"
        parser.feed('new @a = 11;');
    await file_system.appendFileSync(json_file, JSON.stringify(parser.results[0]))
    }catch(e){
        console.log(e.message)
    }
}
for(var i=0; i<5; i++){
parser_gen("./index.fza").catch(err => console.log(err.message))
}
