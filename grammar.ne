@builtin "whitespace.ne"

@include "./grammar_modules/variable.ne"
@include "./grammar_modules/expression.ne"
@include "./grammar_modules/assignment.ne"
@include "./grammar_modules/types.ne"
@include "./grammar_modules/statement.ne"

program
    -> declaration
    | expression
    | assignment
    | statement