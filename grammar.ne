
@include "./grammar_modules/variable.ne"
@include "./grammar_modules/expression.ne"
@include "./grammar_modules/declaration.ne"
@include "./grammar_modules/statement.ne"
@include "./grammar_modules/assignment.ne"

program
    -> declaration
    | assignment
    | statement

_ -> [ \r\t\n,]:* {% d => null %}
__ -> [ \r\t\n,]:+  {% d => null %}