
const nearley = require("nearley");
const grammar = require("./grammar.js")
const util = require('util')
const line_reader = require('line-reader')
var file_system = require('mz/fs')
var promise = require('bluebird')
var colors = require('colors');

function fastDetect(err, line){


error = err.message.substring(0, err.message.indexOf(":\n\n"))
if (line != 1) {
error = error.replace(error.substring(error.indexOf("line ") + 5, error.indexOf(" col")), line)
error = error.substring(0, error.indexOf("col")- 1)
}else{
    error = err.message.substring(0, err.message.indexOf("at") - 1);
}
console.log(error.red.bold + " :(".red)
console.log("\"".red.bold + err.token.value.red.bold + "\"".red.bold + " < This token is unexpected\n".red)
}

function verify_tags(feazy_file){
    let file = file_system.readFileSync(feazy_file,"utf8")
    tags = new Array()
    classes = new Array()
    i = 0
    while(i == 0 ){
        str = file.substring(file.indexOf("$"), file.indexOf("{")+1)
        if(str == ""){
            i = 1
        }else{
            tags.push(str)
            file = file.replace(str, "")
        }
    }
    for(i = 0; i<tags.length; i++){
        tags[i] = tags[i].replace(/\s/g, '');
        tags[i] = tags[i].replace("$","")
        tags[i] = tags[i].replace("{","")
        if(tags[i].indexOf(".") != -1){
        classes.push(tags[i].slice(tags[i].indexOf(".")+1))
        tags[i] = tags[i].slice(0,tags[i].indexOf("."))
        }
    }

    j = 0
    expected_tags = ["head","title","favicon","a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","command","datalist","dd","del","details","dfn","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","section","select","small","source","span","strong","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","var","video","wbr"]
    for(i=0; i<tags.length; i++){
        if(expected_tags.includes(tags[i]) == false){
            msg = "\"" + tags[i] + "\" is an invalid HTML tag :("
            console.log(msg.red)
            j = 1
        }
    }
    return j
}

function line_parse(file, line){
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    try{
        parser.feed(line)
    }catch(err){
        sub = line.substring(err.offset, line.indexOf(" "))
        index = file.indexOf(sub)
        tempString = file.substring(0, index)
        l = tempString.split("\n").length
        fastDetect(err,l)
        i = 1
    }
    return i;
}

detect = async function (feazy_file, feazy_project){
    fzv = feazy_file + "v"
    console.log("\nChecking " + feazy_file + " file:")
    i = 0
    let file = file_system.readFileSync(feazy_file,"utf8")
    var eachLine = promise.promisify(line_reader.eachLine)
    await eachLine(fzv, function(line) {
        i += line_parse(file, line)
    })
    i += verify_tags(feazy_file)

    if(i == 0){
        console.log("No errors :) Good job\n".green)
    }
    file_system.unlinkSync(feazy_file + "a")
    file_system.unlinkSync(feazy_file + "v")
}

module.exports.detect = detect
module.exports.fastDetect = fastDetect