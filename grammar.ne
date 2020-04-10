@builtin "whitespace.ne"
@include "./grammar_modules/variable.ne"
@include "./grammar_modules/expression.ne"
@include "./grammar_modules/assignment.ne"

program
    -> variable_declaration
    | expression