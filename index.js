var parse = require('./parser')
const optimizer = require("./optimizer.js")
const line_reader = require('line-reader')
var file_system = require('fs').promises
const program = require('commander')

program
    // COMMANDE MTE3 TRANSPILATION 
    .command('transpile')
    .alias('t')
    .description('Transpile my Feazy project to HTML & CSS project.')
    .option('-i, --in [value]')
    .action(function(args){
        file_system.readdir(args.in, (err, files) => {
            return files
          }).then(async(files) => {
              var feazy_files = new Array()
              for(var i=0; i<files.length; i++){
                  if(files[i].substr(files[i].length-2,2) == "fz"){
                      feazy_files.push(files[i])
                  }
              }
              console.log(feazy_files)
            if(feazy_files == []){
                console.log("There is no Feazy files (.fz) in this directory!")
            }else{
                for (var i=0; i<feazy_files.length; i++){
                    var feazy_file = args.in + "/" + feazy_files[i]
                    await optimizer.optimize(feazy_file, args.in).then(async() => {
                    await parse.parse(feazy_file,args.in)
                    })
                }
            }
        })
    })

program.parse(process.argv);

// NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEE::::
// TEMPLATING
// LIVE TRANSPALING
// LIVE TESTING (IF POSSIBLE)