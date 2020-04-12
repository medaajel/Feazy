
const nearley = require("nearley");
const grammar = require("./grammar.js");
const util = require('util')

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    
test = "$body .body{ font-family: poppins; size = 10 px;};"

parser.feed(test);
console.log(util.inspect(parser.results[0], false, null, true))
