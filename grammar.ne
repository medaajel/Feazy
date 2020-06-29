
@include "./grammar_modules/variable.ne"
@include "./grammar_modules/expression.ne"
@include "./grammar_modules/statement.ne"
@include "./grammar_modules/assignment.ne"
@include "./grammar_modules/include.ne"
@include "./grammar_modules/use.ne"
@include "./grammar_modules/comment.ne"
@include "./grammar_modules/php_and_js.ne"

program
    -> assignment {% id %}
    | statement {% id %}
    | include {% id %}
    | use {% id %}
    | expression {% id %}
    | comment {% id %}
    | js_and_php {% id %}

_ -> [ \r\t\n,]:* {% d => null %}
__ -> [ \r\t\n,]:+  {% d => null %}