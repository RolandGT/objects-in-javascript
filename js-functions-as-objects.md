# Functions are Objects in JavaScript

Functions are actually objects in JavaScript. The defining
characteristic of a function—what distinguishes
it from any other object—is the presence
of an internal property named [[Call]].

Internal
properties are not accessible via code but rather
define the behavior of code as it executes. ECMAScript defines multiple
internal properties for objects in JavaScript, and these internal properties
are indicated by double-square-bracket notation.

The [[Call]] property is unique to functions and indicates that the
object can be executed. Because only functions have this property, the
typeof operator is defined by ECMAScript to return "function" for any
object with a [[Call]] property.

# Declarations vs. Expressions

Two literal forms of functions:


<ol>
<li>**function declaration** , which begins with the function keyword and includes the name
of the function immediately following it.</li>

```javascript
function add(num1, num2) {
return num1 + num2;
}
```

<li>**function expression**, which doesn’t require a name
after function. These functions are considered anonymous because the
function object itself has no name. Instead, function expressions are typically
referenced via a variable or property.</li>

```javascript
var add = function(num1, num2) {
return num1 + num2;
};
```

</ol>

Although these two forms are quite similar, they differ in a very important
way. Function declarations are hoisted to the top of the context (either
the function in which the declaration occurs or the global scope) when the
code is executed.
That means you can actually define a function after it is
used in code without generating an error. For example:

```javascript
var result = add(5, 5);
function add(num1, num2) {
return num1 + num2;
}
```

This code might look like it will cause an error, but it works just fine.
That’s because the JavaScript engine hoists the function declaration to
the top and actually executes the code as if it were written like this:

```javascript
// how the JavaScript engine interprets the code
function add(num1, num2) {
return num1 + num2;
}
var result = add(5, 5);
```

Function hoisting happens only for function declarations because
the function name is known ahead of time. Function expressions, on the
other hand, cannot be hoisted because the functions can be referenced
only through a variable. So this code causes an error:

```javascript
// error!
var result = add(5, 5);
var add = function(num1, num2) {
return num1 + num2;
};
```
