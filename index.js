var parse = require('./parser')
const optimizer = require("./optimizer.js")
const file_system =require('fs');
const program = require('commander')
var inquirer = require('inquirer')
var colors = require("colors")
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`
var detector = require('./detector.js')

program
    // COMMANDE MTE3 TRANSPILATION 
    .command('transpile')
    .alias('t')
    .description('Transpile my Feazy project to HTML & CSS project.')
    .option('-i, --in [value]')
    .option('-l, --live [value]')
    .action(function(args){
        try{
        var files = file_system.readdirSync(args.in)
              var feazy_files =  []
              for(var i=0; i<files.length; i++){
                  if(files[i].substr(files[i].length-2,2) == "fz"){
                      feazy_files.push(files[i])
                  }
              }
            if(feazy_files[0] == null){
                console.log("There is no Feazy files (.fz) in this directory!".red)
            }else{
                if (Number.isInteger(Number(args.live)) == true){
                    if(args.live < 1 || args.live > 10){
                        console.log("Please enter a valid interval between 1 and 10 !".red)
                    }else{
                    console.log("NOTE: When you create new Feazy class you need restart live transpiler!".yellow)
                    console.log("To stop running just click: CTRL+C".yellow)

                    var minutes = args.live, the_interval = minutes * 60 * 1000;
                    setInterval(function() {
                    for (var i=0; i<feazy_files.length; i++){
                        var feazy_file = args.in + "/" + feazy_files[i]
                        optimizer.optimize(feazy_file, args.in).then(async() => {
                        await parse.parse(feazy_file,args.in)
                        })
                    }
                    }, the_interval);
                    }
                }else{
                for (var i=0; i<feazy_files.length; i++){
                    var feazy_file = args.in + "/" + feazy_files[i]
                    optimizer.optimize(feazy_file, args.in).then(async() => {
                    await parse.parse(feazy_file,args.in)
                    })
                }
                }
            }
        }catch(e){
            console.log(e.message.red)
        }
    })

    program
    // COMMANDE MTE3 TRANSPILATION 
    .command('detect')
    .alias('d')
    .description('Detect and handle Feazy project errors')
    .option('-i, --in [value]')
    .action(function(args){
        try{
        var files = file_system.readdirSync(args.in)
              var feazy_files =  []
              for(var i=0; i<files.length; i++){
                  if(files[i].substr(files[i].length-2,2) == "fz"){
                      feazy_files.push(files[i])
                  }
              }
            if(feazy_files[0] == null){
                console.log("There is no Feazy files (.fz) in this directory!".red)
            }else{
               
                for (var i=0; i<feazy_files.length; i++){
                    var feazy_file = args.in + "/" + feazy_files[i]
                    optimizer.optimize(feazy_file, args.in).then(async() => {
                    await detector.detect(feazy_file, args.in)
                    })
                }
                
            }
        }catch(e){
            console.log(e.message.red)
        }
    })
         program
        .command('create')
        .alias('c')
        .description('Create new Feazy project')
        .action(function(args){
             inquirer .prompt([
                {
                    name:"name",
                    message:"What is your project name?",
                    default:"myProject"
                },
                {
                    name:"creator",
                    message:"This project created by?",
                    default:"Unknown"
                },
                {
                    name:"index",
                    message:"What is your main page's name?",
                    default:"index"
                },
                {
                    name:"css_framework",
                    type:"list",
                    message:"What CSS framework you want to use?",
                    choices:["None","Bootstrap","Semantic"],
                }
            ]).then(answers => {
                        if (file_system.existsSync(desktopDir + "/" + answers["name"]) == false){
                        file_system.mkdirSync(desktopDir + "/" + answers["name"])
                        var path = desktopDir + "/" + answers["name"];
                            cf = 0
                        if(answers["css_framework"] == "Bootstrap"){
                            cf = 1
                            file_system.writeFileSync(path + "/" + "css_framework.fz",
                        "#html\n "+
                        "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css\">" +
                        "\n<script src=\"https://code.jquery.com/jquery-3.5.1.slim.min.js\"></script>" +
                        "\n<script src=\"https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js\"></script>" +
                        "\n<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js\"></script>\n #html")
                        }
                        if(answers["css_framework"] == "Semantic"){
                            cf = 1
                            file_system.writeFileSync(path + "/" + "css_framework.fz",
                        "#html\n "+
                        "<link rel=\"stylesheet\" type=\"text/css\" href=\"semantic/dist/semantic.min.css\">\n" +
                        "<script\n" +
                        "src=\"https://code.jquery.com/jquery-3.1.1.min.js\"\n" +
                        "></script>\n" +
                        "<script src=\"semantic/dist/semantic.min.js\"></script>\n #html")
                        }

                        if(cf == 0){
                        file_system.writeFileSync(path + "/" + answers["index"] + ".fz",
                        "// Project name: " + answers["name"] + "\n"
                        + "// Developer: " + answers["creator"] + "\n\n@use(\"strings.fz\")")
                        file_system.writeFileSync(path + "/" + "strings.fz",
                        "// Here you can declare variables that you will use\n\n")
                        file_system.mkdirSync(path + "/feazy!,l_samples")
                        }else{
                            file_system.writeFileSync(path + "/" + answers["index"] + ".fz",
                            "// Project name: " + answers["name"] + "\n"
                            + "// Developer: " + answers["creator"] + "\n\n@use(\"strings.fz\")\n@include(\"css_framework.fz\")")
                            file_system.writeFileSync(path + "/" + "strings.fz",
                            "// Here you can declare variables that you will use\n\n")
                        }
                        console.log("Project created successfully in Desktop/".bold.green + answers["name"].bold.green)
                        }else{
                            console.log("This project is already created!".yellow)
                        }
                        
                

            })
        })

program.parse(process.argv);

// NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEE::::
// TEMPLATING
// LIVE TESTING (IF POSSIBLE)