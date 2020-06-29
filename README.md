# Feazy
**CLI source-to-source compiler / Context-free language**


### Description
The main goal of this project is to build a high-level language that makes front-end development more interactive and easiest. This mission consists of producing a context-free grammar on a simple way to get an effortless syntax to learn and code, and implementing the necessary concepts to make an uncomplicated language, with keeping the process of transpilation speedy. 
<br/>
**All Feazy files are saved with (.fz) extension**


#### Used technologies
NodeJS, Nearley, JSON<br/>Libraries: CommanderJS, InquirerJS


#### Copyrights
Produced and developed by Mouhammed Ajel & Sarah Ben Yahia as a graduation project, framed by Mr. Riadh Hadj Mtir


### Documentation
Feazy language has their own context-free grammar combined with many production roles that define its syntax and parsing method using nested object written with JSON.


#### Variables

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


#### Statements

Statements in Feazy are so easy to write and clean to read.

**$body**: tagname<br/>
**.body**: classname<br/>
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

#### Including

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

#### Using
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

#### HTML and CSS native, PHP and JS integration
To make developer feel free and adapt with Feazy this feature is the best.
<br/>
HTML
```html
#HTML
<p>Hello again</p>
#HTML
```

CSS
```css
#CSS
.p {
  color: #FFF;
}
#CSS
```

PHP
```php
#PHP
echo("Hello again");
#PHP
```

JavaScript
```javascript
#JS
alert("Hello again");
#JS
```

