const nearley = require("nearley");
const grammar = require("./grammar.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    
    parser.feed("new @ajel   =  true");
    console.log(parser.results[0]);
