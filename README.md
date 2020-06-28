# Feazy
**CLI source-to-source compiler / Context-free language**

## Description
The main goal of this project is to build a high-level language that makes front-end development more interactive and easiest. This mission consists of producing a context-free grammar on a simple way to get an effortless syntax to learn and code, and implementing the necessary concepts to make an uncomplicated language, with keeping the process of transpilation speedy. 

### Used technologies
NodeJS, Nearley, JSON
Libraries: CommanderJS, InquirerJS

### Copyrights
Produced and developed by Mouhammed Ajel & Sarah Ben Yahia as a graduation project, framed by Mr. Riadh Hadj Mtir

## Documentation
Feazy language has their own context-free grammar combined with many production roles that define its syntax and parsing method using nested object written with JSON.

### Variables
With Feazy, you havn't to declare variable with specific type and use it then! All you need to do is assign to variable directly and use it as a global one
```
@variable = value; 
@bg = #fff;
```

```
$body .body{
bg-color = @bg;
};
```
