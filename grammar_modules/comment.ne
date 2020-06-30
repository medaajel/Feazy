comment -> "\\\\" _ characters
    {% d => { 
        return{
            type:"comment",
            text:d[2]
        }
    }
    %}