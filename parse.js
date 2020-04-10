const nearley = require("nearley");
const grammar = require("./grammar.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed("@a = 123");
    console.log(parser.results[0]);
