// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "variable_declaration", "symbols": [{"literal":"@"}, "variable_name", "_"]},
    {"name": "variable_declaration", "symbols": [{"literal":"@"}, "variable_name", "_", {"literal":"="}, "_", "variable_value"], "postprocess": 
        data => {
            return {
                variable_name:data[1],
                variable_value:data[5]
            }
        }
        },
    {"name": "variable_name$ebnf$1", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "variable_name$ebnf$1", "symbols": ["variable_name$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "variable_name", "symbols": ["variable_name$ebnf$1"], "postprocess": data => data[0].join("")},
    {"name": "variable_value$ebnf$1", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "variable_value$ebnf$1", "symbols": ["variable_value$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "variable_value", "symbols": ["variable_value$ebnf$1"], "postprocess": data => data[0].join("")},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[ ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]}
]
  , ParserStart: "variable_declaration"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
