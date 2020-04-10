// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "variable_declaration", "symbols": ["_", {"literal":"@"}, "declaration_identifier", "_"], "postprocess":  data => {
        return {
            declaration_identifier:data[2],
            declaration_variable_value:"null"
            }
        }
        },
    {"name": "variable_declaration", "symbols": ["_", {"literal":"@"}, "declaration_identifier", "_", {"literal":"="}, "_", "declaration_variable_value", "_"], "postprocess":  data => {
        return {
            declaration_identifier:data[2],
            declaration_variable_value:data[6]
            }
        }
        },
    {"name": "variable_declaration", "symbols": ["_", {"literal":"@"}, "declaration_identifier", "_", {"literal":"="}, "_", "expression", "_"], "postprocess":  data => {
        return {
            declaration_identifier:data[2],
            declaration_variable_value:data[6]
            }
        }
        },
    {"name": "declaration_identifier$ebnf$1", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "declaration_identifier$ebnf$1", "symbols": ["declaration_identifier$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "declaration_identifier", "symbols": ["declaration_identifier$ebnf$1"], "postprocess": data => data[0].join("")},
    {"name": "declaration_variable_value$ebnf$1", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "declaration_variable_value$ebnf$1", "symbols": ["declaration_variable_value$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "declaration_variable_value", "symbols": ["declaration_variable_value$ebnf$1"], "postprocess": data => data[0].join("")},
    {"name": "expression", "symbols": ["_", "AS", "_"], "postprocess": data => {return data[1]; }},
    {"name": "P", "symbols": [{"literal":"("}, "_", "AS", "_", {"literal":")"}], "postprocess": data => {return data[2]; }},
    {"name": "P", "symbols": ["N"], "postprocess": id},
    {"name": "E", "symbols": ["P", "_", {"literal":"^"}, "_", "E"], "postprocess": data => {return Math.pow(data[0], data[4]); }},
    {"name": "E", "symbols": ["P"], "postprocess": id},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"*"}, "_", "E"], "postprocess": data => {return data[0]*data[4]; }},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"/"}, "_", "E"], "postprocess": data => {return data[0]/data[4]; }},
    {"name": "MD", "symbols": ["E"], "postprocess": id},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"+"}, "_", "MD"], "postprocess": data => {return data[0]+data[4]; }},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"-"}, "_", "MD"], "postprocess": data => {return data[0]-data[4]; }},
    {"name": "AS", "symbols": ["MD"], "postprocess": id},
    {"name": "N", "symbols": ["float"], "postprocess": id},
    {"name": "N$string$1", "symbols": [{"literal":"s"}, {"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$1", "_", "P"], "postprocess": data => {return Math.sin(data[2]); }},
    {"name": "N$string$2", "symbols": [{"literal":"c"}, {"literal":"o"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$2", "_", "P"], "postprocess": data => {return Math.cos(data[2]); }},
    {"name": "N$string$3", "symbols": [{"literal":"t"}, {"literal":"a"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$3", "_", "P"], "postprocess": data => {return Math.tan(data[2]); }},
    {"name": "N$string$4", "symbols": [{"literal":"a"}, {"literal":"s"}, {"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$4", "_", "P"], "postprocess": data => {return Math.asin(data[2]); }},
    {"name": "N$string$5", "symbols": [{"literal":"a"}, {"literal":"c"}, {"literal":"o"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$5", "_", "P"], "postprocess": data => {return Math.acos(data[2]); }},
    {"name": "N$string$6", "symbols": [{"literal":"a"}, {"literal":"t"}, {"literal":"a"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$6", "_", "P"], "postprocess": data => {return Math.atan(data[2]); }},
    {"name": "N$string$7", "symbols": [{"literal":"p"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$7"], "postprocess": data => {return Math.PI; }},
    {"name": "N", "symbols": [{"literal":"e"}], "postprocess": data => {return Math.E; }},
    {"name": "N$string$8", "symbols": [{"literal":"s"}, {"literal":"q"}, {"literal":"r"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$8", "_", "P"], "postprocess": data => {return Math.sqrt(data[2]); }},
    {"name": "N$string$9", "symbols": [{"literal":"l"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "N", "symbols": ["N$string$9", "_", "P"], "postprocess": data => {return Math.log(data[2]); }},
    {"name": "float", "symbols": ["int", {"literal":"."}, "int"], "postprocess": data => {return parseFloat(data[0] + data[1] + data[2])}},
    {"name": "float", "symbols": ["int"], "postprocess": data => {return parseInt(data[0])}},
    {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1"], "postprocess": data => {return data[0].join(""); }},
    {"name": "assignment", "symbols": [{"literal":"@"}, "assignment_identifier", {"literal":"="}, "assignment_value"], "postprocess":  data => {
        return {
            assignment_identifier:data[1],
            assignment_value:data[5]
            }}
                },
    {"name": "assignment_value$ebnf$1", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "assignment_value$ebnf$1", "symbols": ["assignment_value$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "assignment_value", "symbols": ["assignment_value$ebnf$1"], "postprocess": data => data[0].join("")},
    {"name": "assignment_identifier$ebnf$1", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "assignment_identifier$ebnf$1", "symbols": ["assignment_identifier$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "assignment_identifier", "symbols": ["assignment_identifier$ebnf$1"], "postprocess": data => data[0].join("")},
    {"name": "program", "symbols": ["variable_declaration"]},
    {"name": "program", "symbols": ["expression"]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
