// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "string", "symbols": [{"literal":"\""}, "characters", {"literal":"\""}], "postprocess": 
        (data) => (data[1]).toString()
        },
    {"name": "characters", "symbols": ["character"], "postprocess": id},
    {"name": "characters", "symbols": ["character", "characters"], "postprocess": (data) => data[0] + data[1]},
    {"name": "character", "symbols": [/[^/";]/], "postprocess": id},
    {"name": "float", "symbols": ["int", {"literal":"."}, "int"], "postprocess": data => {return parseFloat(data[0] + data[1] + data[2])}},
    {"name": "float", "symbols": ["int"], "postprocess": data => {return parseInt(data[0])}},
    {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1"], "postprocess": data => {return data[0].join(""); }},
    {"name": "bool$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "bool", "symbols": ["bool$string$1"], "postprocess": data => "b#" + data[0]},
    {"name": "bool$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "bool", "symbols": ["bool$string$2"], "postprocess": data => "b#" + data[0]},
    {"name": "value", "symbols": ["string"], "postprocess": id},
    {"name": "value", "symbols": ["characters"], "postprocess": id},
    {"name": "value", "symbols": ["float"], "postprocess": id},
    {"name": "value", "symbols": ["int"], "postprocess": id},
    {"name": "value", "symbols": ["bool"], "postprocess": id},
    {"name": "value", "symbols": ["expression"], "postprocess": id},
    {"name": "value", "symbols": ["identifier"], "postprocess": id},
    {"name": "identifier$ebnf$1", "symbols": [/[a-zA-Z0-9_]/]},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifier", "symbols": [{"literal":"@"}, "identifier$ebnf$1"], "postprocess": data => data[0] + data[1].join("")},
    {"name": "expression", "symbols": ["_", "AS", "_"], "postprocess": data => {return data[1]; }},
    {"name": "expression", "symbols": ["element", "_", "comparison_operator", "_", "element"], "postprocess": 
        d => ({
            type: "comparison",
            operator: d[2],
            left: d[0],
            right: d[4]
        })
                },
    {"name": "comparison_operator", "symbols": [{"literal":">"}], "postprocess": id},
    {"name": "comparison_operator$string$1", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparison_operator", "symbols": ["comparison_operator$string$1"], "postprocess": id},
    {"name": "comparison_operator", "symbols": [{"literal":"<"}], "postprocess": id},
    {"name": "comparison_operator$string$2", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparison_operator", "symbols": ["comparison_operator$string$2"], "postprocess": id},
    {"name": "comparison_operator$string$3", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparison_operator", "symbols": ["comparison_operator$string$3"], "postprocess": id},
    {"name": "element", "symbols": ["int"], "postprocess": data => {return parseInt(data[0])}},
    {"name": "element", "symbols": ["float"], "postprocess": data => {return parseFloat(data[0])}},
    {"name": "element", "symbols": ["identifier"], "postprocess": id},
    {"name": "element", "symbols": ["expression"], "postprocess": id},
    {"name": "element", "symbols": ["string"], "postprocess": id},
    {"name": "element", "symbols": ["bool"], "postprocess": id},
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
    {"name": "statement$ebnf$1", "symbols": []},
    {"name": "statement$ebnf$1", "symbols": ["statement$ebnf$1", "instructions"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statement$ebnf$2", "symbols": []},
    {"name": "statement$ebnf$2", "symbols": ["statement$ebnf$2", "statement"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statement", "symbols": [{"literal":"$"}, "tagname", "__", "class", "_", {"literal":"{"}, "_", "statement$ebnf$1", "_", "statement$ebnf$2", "_", {"literal":"}"}, "_", {"literal":";"}, "_"], "postprocess": 
        d => {
            return {
                type:"tag",
                tagname: d[1],
                class: d[3],
                instructions: d[7],
                sub_tags: d[9]
            }
        }
        },
    {"name": "statement$string$1", "symbols": [{"literal":"$"}, {"literal":"h"}, {"literal":"e"}, {"literal":"a"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement$ebnf$3", "symbols": []},
    {"name": "statement$ebnf$3", "symbols": ["statement$ebnf$3", "statement"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statement", "symbols": ["statement$string$1", "_", {"literal":"{"}, "_", "statement$ebnf$3", "_", {"literal":"}"}, "_", {"literal":";"}, "_"], "postprocess": 
        d => {
                return {
                    type:"head",
                    sub_tags: d[4],
                }
            }
        },
    {"name": "statement$ebnf$4", "symbols": []},
    {"name": "statement$ebnf$4", "symbols": ["statement$ebnf$4", "instructions"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statement", "symbols": [{"literal":"$"}, "tagname", "_", {"literal":"{"}, "_", "statement$ebnf$4", "_", {"literal":"}"}, "_", {"literal":";"}, "_"], "postprocess": 
        d => {
                return {
                    type:"head_tag",
                    tagname: d[1],
                    instructions: d[5],
                }
            }
        },
    {"name": "instructions", "symbols": ["attribut", "_", /[=|:]/, "_", "value_with_unity", "_", {"literal":";"}, "_"], "postprocess":  
        d => { switch(d[2]){
            case "=": return(( d[0] + "=" + d[4]).toString())
            case ":": return((d[0] + ":" + d[4]).toString())
        }
        }
        },
    {"name": "attribut$ebnf$1", "symbols": [/[a-zA-Z0-9_-]/]},
    {"name": "attribut$ebnf$1", "symbols": ["attribut$ebnf$1", /[a-zA-Z0-9_-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "attribut", "symbols": ["attribut$ebnf$1"], "postprocess": d => d[0].join("")},
    {"name": "class$ebnf$1", "symbols": [/[a-zA-Z0-9_]/]},
    {"name": "class$ebnf$1", "symbols": ["class$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "class", "symbols": [/[.]/, "class$ebnf$1"], "postprocess": d => d[1].join("")},
    {"name": "value_with_unity$subexpression$1$string$1", "symbols": [{"literal":"p"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value_with_unity$subexpression$1", "symbols": ["value_with_unity$subexpression$1$string$1"]},
    {"name": "value_with_unity$subexpression$1$string$2", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value_with_unity$subexpression$1", "symbols": ["value_with_unity$subexpression$1$string$2"]},
    {"name": "value_with_unity$subexpression$1$string$3", "symbols": [{"literal":"p"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value_with_unity$subexpression$1", "symbols": ["value_with_unity$subexpression$1$string$3"]},
    {"name": "value_with_unity$subexpression$1", "symbols": [{"literal":"%"}]},
    {"name": "value_with_unity", "symbols": ["identifier", "_", "value_with_unity$subexpression$1"], "postprocess": d => d[0] + d[2]},
    {"name": "value_with_unity", "symbols": ["identifier"]},
    {"name": "value_with_unity$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "value_with_unity$ebnf$1", "symbols": ["value_with_unity$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "value_with_unity$subexpression$2$string$1", "symbols": [{"literal":"p"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value_with_unity$subexpression$2", "symbols": ["value_with_unity$subexpression$2$string$1"]},
    {"name": "value_with_unity$subexpression$2$string$2", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value_with_unity$subexpression$2", "symbols": ["value_with_unity$subexpression$2$string$2"]},
    {"name": "value_with_unity$subexpression$2$string$3", "symbols": [{"literal":"p"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value_with_unity$subexpression$2", "symbols": ["value_with_unity$subexpression$2$string$3"]},
    {"name": "value_with_unity$subexpression$2", "symbols": [{"literal":"%"}]},
    {"name": "value_with_unity", "symbols": ["value_with_unity$ebnf$1", "_", "value_with_unity$subexpression$2"], "postprocess": d => d[0].join("") + d[2]},
    {"name": "value_with_unity", "symbols": ["string"], "postprocess": id},
    {"name": "value_with_unity$subexpression$3$string$1", "symbols": [{"literal":"p"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value_with_unity$subexpression$3", "symbols": ["value_with_unity$subexpression$3$string$1"]},
    {"name": "value_with_unity$subexpression$3$string$2", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value_with_unity$subexpression$3", "symbols": ["value_with_unity$subexpression$3$string$2"]},
    {"name": "value_with_unity$subexpression$3$string$3", "symbols": [{"literal":"p"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value_with_unity$subexpression$3", "symbols": ["value_with_unity$subexpression$3$string$3"]},
    {"name": "value_with_unity$subexpression$3", "symbols": [{"literal":"%"}]},
    {"name": "value_with_unity", "symbols": ["expression", "_", "value_with_unity$subexpression$3"], "postprocess": d => d[0] + d[2]},
    {"name": "value_with_unity$ebnf$2", "symbols": [/[0-9A-Fa-f]/]},
    {"name": "value_with_unity$ebnf$2", "symbols": ["value_with_unity$ebnf$2", /[0-9A-Fa-f]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "value_with_unity", "symbols": [{"literal":"#"}, "value_with_unity$ebnf$2"], "postprocess": d => d[0] + d[1].join("")},
    {"name": "value_with_unity$ebnf$3", "symbols": [/[0-9]/]},
    {"name": "value_with_unity$ebnf$3", "symbols": ["value_with_unity$ebnf$3", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "value_with_unity", "symbols": ["value_with_unity$ebnf$3"], "postprocess": d => d[0].join("")},
    {"name": "tagname$ebnf$1", "symbols": [/[a-zA-Z0-9_-]/]},
    {"name": "tagname$ebnf$1", "symbols": ["tagname$ebnf$1", /[a-zA-Z0-9_-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "tagname", "symbols": ["tagname$ebnf$1"], "postprocess": d => d[0].join("")},
    {"name": "assignment", "symbols": ["identifier", "_", {"literal":"="}, "_", "value", "_", {"literal":";"}], "postprocess": 
        d => ({
            type:"assignment",
            identifier:d[0],
            value:d[4]
        })
        },
    {"name": "include$string$1", "symbols": [{"literal":"@"}, {"literal":"i"}, {"literal":"n"}, {"literal":"c"}, {"literal":"l"}, {"literal":"u"}, {"literal":"d"}, {"literal":"e"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "include", "symbols": ["include$string$1", "link", {"literal":")"}, "_", {"literal":";"}], "postprocess": 
        d => ({
            type:"include",
            link: d[1]
        })
        },
    {"name": "link", "symbols": ["string"], "postprocess": id},
    {"name": "link", "symbols": ["identifier"], "postprocess": id},
    {"name": "use$string$1", "symbols": [{"literal":"@"}, {"literal":"u"}, {"literal":"s"}, {"literal":"e"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "use", "symbols": ["use$string$1", "link", {"literal":")"}, "_", {"literal":";"}], "postprocess": 
        d => ({
            type:"use",
            link: d[1]
        })
        },
    {"name": "link", "symbols": ["string"], "postprocess": id},
    {"name": "link", "symbols": ["identifier"], "postprocess": id},
    {"name": "comment$string$1", "symbols": [{"literal":"\\"}, {"literal":"\\"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comment", "symbols": ["comment$string$1", "_", "characters"], "postprocess":  d => { 
            return{
                type:"comment",
                text:d[2]
            }
        }
        },
    {"name": "js_and_php$string$1", "symbols": [{"literal":"#"}, {"literal":"j"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "js_and_php$string$2", "symbols": [{"literal":"#"}, {"literal":"j"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "js_and_php", "symbols": ["js_and_php$string$1", "_", "special_characters", "_", "js_and_php$string$2"], "postprocess": 
        d => {
           return{
               type:"js",
               code:d[2]
           } 
        }
        },
    {"name": "js_and_php$string$3", "symbols": [{"literal":"#"}, {"literal":"p"}, {"literal":"h"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "js_and_php$string$4", "symbols": [{"literal":"#"}, {"literal":"p"}, {"literal":"h"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "js_and_php", "symbols": ["js_and_php$string$3", "_", "special_characters", "_", "js_and_php$string$4"], "postprocess": 
        d => {
           return{
               type:"php",
               code:d[2]
           } 
        }
        },
    {"name": "js_and_php$string$5", "symbols": [{"literal":"#"}, {"literal":"h"}, {"literal":"t"}, {"literal":"m"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "js_and_php$string$6", "symbols": [{"literal":"#"}, {"literal":"h"}, {"literal":"t"}, {"literal":"m"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "js_and_php", "symbols": ["js_and_php$string$5", "_", "special_characters", "_", "js_and_php$string$6"], "postprocess": 
        d => {
           return{
               type:"html",
               code:d[2]
           } 
        }
        },
    {"name": "js_and_php$string$7", "symbols": [{"literal":"#"}, {"literal":"c"}, {"literal":"s"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "js_and_php$string$8", "symbols": [{"literal":"#"}, {"literal":"c"}, {"literal":"s"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "js_and_php", "symbols": ["js_and_php$string$7", "_", "special_characters", "_", "js_and_php$string$8"], "postprocess": 
        d => {
           return{
               type:"css",
               code:d[2]
           } 
        }
        },
    {"name": "special_characters$ebnf$1$subexpression$1", "symbols": ["character"]},
    {"name": "special_characters$ebnf$1$subexpression$1", "symbols": [/[/";]/]},
    {"name": "special_characters$ebnf$1", "symbols": ["special_characters$ebnf$1$subexpression$1"]},
    {"name": "special_characters$ebnf$1$subexpression$2", "symbols": ["character"]},
    {"name": "special_characters$ebnf$1$subexpression$2", "symbols": [/[/";]/]},
    {"name": "special_characters$ebnf$1", "symbols": ["special_characters$ebnf$1", "special_characters$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "special_characters", "symbols": ["special_characters$ebnf$1"], "postprocess": d => d[0].join("")},
    {"name": "program", "symbols": ["assignment"], "postprocess": id},
    {"name": "program", "symbols": ["statement"], "postprocess": id},
    {"name": "program", "symbols": ["include"], "postprocess": id},
    {"name": "program", "symbols": ["use"], "postprocess": id},
    {"name": "program", "symbols": ["comment"], "postprocess": id},
    {"name": "program", "symbols": ["js_and_php"], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[ \r\t\n,]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": d => null},
    {"name": "__$ebnf$1", "symbols": [/[ \r\t\n,]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[ \r\t\n,]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": d => null}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
