![Feazy logo](https://github.com/medaajel/Feazy/raw/master/logo.png)

## Description
The main goal of this project is to build a high-level language that makes front-end development more interactive and easiest. This mission consists of producing a context-free grammar on a simple way to get an effortless syntax to learn and code, and implementing the necessary concepts to make an uncomplicated language, with keeping the process of transpilation speedy. 
<br/>

NOTES:
- **All Feazy files are saved with (.fz) extension**
- **Feazy is a case sensitive language**


### Used technologies & libraries
NodeJS, Nearley, JSON, CommanderJS, InquirerJS

## How it works?
Feazy transpiler is a CLI application developed simply to use it easily.
Feazy has three commands you can call:
- Create (alias: c)
- Transpile (alias: t)
- Detect (alias: d)
<br/>
Every command has its own functionality and options.
<br/>

### Create
This command is used to create new Feazy project and initialize environement.
<br/>
**Syntax: "Feazy create" or "Feazy c"**
Feazy use inquirerJS to make interactive Q&A like:
![First capture - create](https://raw.githubusercontent.com/medaajel/Feazy/master/screenshots/capture-create-1.PNG)
<br/>
![Second capture - create](https://raw.githubusercontent.com/medaajel/Feazy/master/screenshots/capture-create-2.PNG)
<br/>
This files that will be initialized automatically in your project folder:
![Third capture - create](https://raw.githubusercontent.com/medaajel/Feazy/master/screenshots/capture-create-3.PNG)
<br/>
This is initialized homepage:
![Fourth capture - create](https://raw.githubusercontent.com/medaajel/Feazy/master/screenshots/capture-create-4.PNG)
<br/>
This file where you can define globale variables to use many times:
![Fifth capture - create](https://raw.githubusercontent.com/medaajel/Feazy/master/screenshots/capture-create-5.PNG)
<br/>

### Transpile
This command is used to transpile Feazy project to HTML & CSS project.
<br/>
__**Syntax: "Feazy transpile [options]" or "Feazy t [options]"**__
<br/>
Options:
- Project location ("--in project_dir" or "-i project_dir")
- Live transpilation ("--live interval" or "-l interval") __(Interval per minute)__

__**Example: "Feazy t -i project_dir -l 5"**__
<br/>
![First capture - transpile](https://raw.githubusercontent.com/medaajel/Feazy/master/screenshots/capture-transpile.PNG)
<br/>
### Detect
This command is used to detect Feazy code errors.
<br/>
__**Syntax: "Feazy detect [options]" or "Feazy d [options]"**__
<br/>
Options:
- Project location ("--in project_dir" or "-i project_dir")

__**Example: "Feazy d -i project_dir"**__
<br/>
![First capture - detect](https://raw.githubusercontent.com/medaajel/Feazy/master/screenshots/capture-detect-no-errors.PNG)
<br/>
![Second capture - detect](https://raw.githubusercontent.com/medaajel/Feazy/master/screenshots/capture-detect-error.PNG)
<br/>
## Documentation
Feazy language has their own context-free grammar combined with many production roles that define its syntax and parsing method using nested object written with JSON.


### Variables

With Feazy, you havn't to declare variable with specific type and use it then! All you need to do is assign to variable directly and use it as a global one
```
@a = 1;
@b = 2;
@c = @b + @a;
```

```
@bg = #FFF;
$body .body{
  bg-color= @bg;
};
```

Feazy supports probably all known variable types, such as:
- Integer
- Float
- String
- Boolean
- Character
- **Color hex**

### Operators & mathematical expressions
For easy front-end development, avoid CSS margin and padding problems you can save your values with variables.
Also, you can use operators and expressions!

```
@a = 1 + 1;
@b = 4 - @a;
@c = 2 / @b;
@d = @b * @c;
@e = sin(@d) + cos(@a);
@f = @e * pi;
```


### Statements

Statements in Feazy are so easy to write and clean to read.

**$body**: tagname<br/>
**.body**: classname *(optional)*<br/>
**content**: attribut used to set content<br/>
**attr:value**: operator used between the attribut and value to notice that is a CSS attribut<br/>
**attr=value**: operator used between the attribut and value to notice that is a HTML attribut<br/>


Feazy:
```
$body .body{
  background: #FFF;
  $h1 {
    content= "Hello, World!";
  };
};
```

Transpiled to:
```html
<body class="body">
  <h1>
    Hello, World!
  </h1>
</body>
```

```css
.body {
background: #FFF;
}
```

### Including

Including is one of the important features that will offer distribution and easy project management.<br/>
Include is used to reuse a bloc of code many times with writing it only one time.
<br/>
heading.fz
```
$h1 .h1{
  content="Hello, World!";
};
```

```
$body .body{
  @include("heading.fz");
};
```

Means:

```
$body .body{
  $h1 {
    content= "Hello, World!";
  };
};
```

### Using
Using is a feature that gives the opportunity to developer to declare all global variables in one file

```
@use("strings.fz");
```
<br/>
strings.fz

```
@name= "Feazy";
@description= "Context-free language";
@ver= 0.1;
```

### HTML and CSS native, PHP and JS integration
To make developer feel free and adapt with Feazy this feature is the best.
<br/>
HTML
```
#HTML
<p>Hello again</p>
#HTML
```

CSS
```
#CSS
.p {
  color: #FFF;
}
#CSS
```

PHP
```
#PHP
echo("Hello again");
#PHP
```

JavaScript
```
#JS
alert("Hello again");
#JS
```

### Comments
As any another language, comments are importants to remember your code or to explain it to anyone else
```
\\ This is a comment
```


## Copyrights
© [**Feazy**](http://feazy.medajel.com/) <br/>Produced and developed by [**Mouhammed Ajel**](https://www.linkedin.com/in/medaajel)  & [**Sarah Ben Yahia**](https://www.linkedin.com/in/ben-yahia-sarah-a2025b16a/) as a graduation project. <br/>Framed by **Mr. Riadh Hadj Mtir**
