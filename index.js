var parse = require('./parse')
const analyse = require("./analyse.js")
const line_reader = require('line-reader')
var file_system = require('fs')
const program = require('commander')

program
    .command('transpile')
    .alias('t')
    .description('Transpile my Feazy project to HTML & CSS project.')
    .option('-i, --in [value]')
    .action(function(args){
        parse.parser_gen(args.in)
    })

program.parse(process.argv);
