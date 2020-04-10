const nearley = require("nearley");
const grammar = require("./grammar.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    
    parser.feed("h1 .sarah {  height:100  kk=\"100\"  weight=100  }");
    console.log(parser.results[0]);
