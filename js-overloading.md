# Overloading
Most object-oriented languages support function overloading, which is the
ability of a single function to have multiple signatures.

A function signature
is made up of the function name plus the number and type of parameters
the function expects.

JavaScript functions can accept any number
of parameters, and the types of parameters a function takes aren’t specified
at all. That means JavaScript functions don’t actually have signatures.

A lack of function signatures also means a lack of function overloading.

```javascript
function sayMessage(message) {
    console.log(message);
}
function sayMessage() {
    console.log("Default message");
}
sayMessage("Hello!"); // outputs "Default message"
```
If this were another language, the output of sayMessage("Hello!") would
likely be "Hello!". In JavaScript, however, when you define multiple functions
with the same name, the one that appears last in your code wins.
The earlier function declarations are completely removed, and the last
is the one that is used. Once again, it helps to think about this situation
using objects:

```javascript
var sayMessage = new Function("message", "console.log(message);");
sayMessage = new Function("console.log(\"Default message\");");
sayMessage("Hello!"); // outputs "Default message"
```

A function object is being assigned to sayMessage
twice in a
row, so it makes sense that the first function object would be lost.

The fact that functions don’t have signatures in JavaScript doesn’t
mean you can’t mimic function overloading. You can retrieve the number
of parameters that were passed in by using the arguments object, and you
can use that information to determine what to do. For example:

```javascript
function sayMessage(message) {
    if (arguments.length === 0) {
        message = "Default message";
    }
    console.log(message);
}
sayMessage("Hello!"); // outputs "Hello!"
```

In this example, the sayMessage() function behaves differently based
on the number of parameters that were passed in. If no parameters
are passed in (arguments.length === 0), then a default message is used.
Otherwise, the first parameter is used as the message. This is a little more
involved than function overloading in other languages, but the end result
is the same. If you really want to check for different data types, you can
use typeof and instanceof.