# Objects in JavaScript

Although JavaScript has no concept of classes, it still uses two kinds of
types: primitive and reference. Primitive types are stored as simple data
types. Reference types are stored as objects, which are really just references
to locations in memory.

The tricky thing is that JavaScript lets you treat primitive types like
reference types (using primitive wrapper types) in order to make the language more consistent for the
developer.

While other programming languages distinguish between primitive
and reference types by storing primitives on the stack and references in
the heap, JavaScript does away with this concept completely: It tracks
variables for a particular scope with a variable object. Primitive values are
stored directly on the variable object, while reference values are placed as
a pointer in the variable object, which serves as a reference to a location
in memory where the object is stored.

Despite the fact that they're primitive types, strings, numbers, and
Booleans actually have methods. (The null and undefined types have
no methods.) Strings, in particular, have numerous methods to help
you work with them. For example:

```javascript
var count = 10;
var fixedCount = count.toFixed(2); // convert to "10.00"
var hexCount = count.toString(16); // convert to "a"
var flag = true;
var stringFlag = flag.toString(); // convert to "true"
```

Despite the fact that they have methods, primitive values themselves are not objects.
JavaScript makes them look like objects to provide a consistent experience in the
language.

Reference types represent objects in JavaScript and are the closest things
to classes that you will find in the language. Reference values are instances
of reference types and are synonymous with objects (the rest of this text
refers to reference values simply as objects). An object is an unordered
list of properties consisting of a name (always a string) and a value. When
the value of a property is a function, it is called a method. Functions themselves
are actually reference values in JavaScript, so there's little difference
between a property that contains an array and one that contains a
function except that a function can be executed.
with them.


# Creating Objects

There are a couple of ways to create,
or instantiate, objects. The first is to use
the new operator with a constructor. (A constructor
is simply a function that uses new
to create an object any function can be a constructor).

By convention, constructors in JavaScript begin with a
capital letter to distinguish them from nonconstructor functions. For
example, this code instantiates a generic object and stores a reference
to it in object:

```javascript
var object = new Object();
```
Reference types do not store the object directly into the variable to
which it is assigned, so the object variable in this example doesn't actually
contain the object instance. Instead, it holds a pointer (or reference) to
the location in memory where the object exists. This is the primary difference
between objects and primitive values, as the primitive is stored
directly in the variable.

When you assign an object to a variable, you're actually assigning a
pointer. That means if you assign one variable to another, each variable
gets a copy of the pointer, and both still reference the same object in
memory. For example:

```javascript
var object1 = new Object();
var object2 = object1;
```

This code first creates an object (with new) and stores a reference in
object1. Next, object2 is assigned the value of object1. There is still only
the one instance of the object that was created on the first line, but both
variables now point to that object.

## Dereferencing Objects

JavaScript is a garbage-collected language, so you don't really need to
worry about memory allocations when you use reference types. However,
it's best to dereference objects that you no longer need so that the garbage
collector can free up that memory. The best way to do this is to set the
object variable to null.

```javascript
var object1 = new Object();
// do something
object1 = null; // dereference
```

When there are no more references to an object in memory, the garbage
collector can use that memory for something else. Dereferencing
objects is especially important in very large applications that use millions
of objects.

## Adding or Removing Properties

Another interesting aspect of objects in JavaScript is that you can add and
remove properties at any time. For example:

```javascript
var object1 = new Object();
var object2 = object1;
object1.myCustomProperty = "Awesome!";
console.log(object2.myCustomProperty); // "Awesome!"
```
## Instantiating Built-in Types

You’ve seen how to create and interact with generic objects created with
**new Object()**. The **Object** type is just one of a handful of built-in reference
types that JavaScript provides. The other built-in types are more specialized
in their intended usage and can be instantiated at any time.
The built-in types are:


| Built-in type       | explanation  |
| ------------- |-------------|
| Array | An ordered list of numerically indexed values |
| Date | A date and time |
| Error | A runtime error (there are also several more specific error subtypes) |
| Function | A function |
| Object | A generic object |
| RegExp | A regular expression |

## Object and Array Literals

To create an object with object literal syntax, you can define the properties
of a new object inside braces. Properties are made up of an identifier or
string, a colon, and a value, with multiple properties separated by commas.
For example:

```javascript
var book = {
    name: "JavaScript",
    year: 2019
};
```

You can also use string literals as property names, which is useful
when you want a property name to have spaces or other special
characters:

```javascript
var book = {
    "name": "JavaScript",
    "year": 2019
};
```

Using an object literal doesn't actually call new Object(). Instead, the JavaScript
engine follows the same steps it does when using new Object() without actually
calling the constructor. This is true for all reference literals.

You can define an array literal in a similar way by enclosing any number
of comma-separated values inside square brackets. For example:

```javascript
var colors = [ "red", "blue", "green" ];
console.log(colors[0]); // "red"
This code is equivalent to the following:
var colors = new Array("red", "blue", "green")
console.log(colors[0]); // "red"
```

## Property Access

Properties are name/value pairs that are stored on an object. Dot notation
is the most common way to access properties in JavaScript (as in
many object-oriented languages), but you can also access properties on
JavaScript objects by using bracket notation
with a string.
For example, you could write this code, which uses dot notation:

```javascript
var array = [];
array.push(12345);
```

With bracket notation, the name of the method is now included in a
string enclosed by square brackets, as in this example:

```javascript
var array = [];
array["push"](12345);
```

This syntax is very useful when you want to dynamically decide which
property to access. For example, here bracket notation allows you to use a
variable instead of the string literal to specify the property to access.

```javascript
var array = [];
var method = "push";
array[method](12345);
```

between dot notation and
bracket notation is that bracket notation allows you to use special characters
in property names.

## Primitive Wrapper Types

Perhaps one of the most confusing parts of JavaScript is the concept of
primitive wrapper types. There are three primitive wrapper types (String,
Number, and Boolean). These special reference types exist to make working
with primitive values as easy as working with objects. (It would be very
confusing if you had to use a different syntax or switch to a procedural
style just to get a substring of text.)
The primitive wrapper types are reference types that are automatically
created behind the scenes whenever strings, numbers,
or Booleans are read. For example, in the first line of this listing, a primitive string
value is assigned to name. The second line treats name like an object and
calls charAt(0) using dot notation.

```javascript
var name = "Rol";
var firstChar = name.charAt(0);
console.log(firstChar); // "N"
```

This is what happens behind the scenes:

```javascript
// what the JavaScript engine does
var name = "Rol";
var temp = new String(name);
var firstChar = temp.charAt(0);
temp = null;
console.log(firstChar); // "N"
```

Because the second line uses a string (a primitive) like an object,
the JavaScript engine creates an instance of String so that charAt(0) will
work. The String object exists only for one statement before it's destroyed
(a process called autoboxing). To test this out, try adding a property to a
string as if it were a regular object:

```javascript
var name = "Rol";
name.last = "Ged";
console.log(name.last); // undefined
```

This code attempts to add the property last to the string name. The
code itself is just fine except that the property disappears. What happened?
When working with regular objects, you can add properties at any time
and they stay until you manually remove them. With primitive wrapper
types, properties seem to disappear because the object on which the
property was assigned is destroyed immediately afterward.

Here's what's actually happening in the JavaScript engine:

```javascript
// what the JavaScript engine does
var name = "Rol";
var temp = new String(name);
temp.last = "Get";
temp = null; // temporary object destroyed
var temp = new String(name);
console.log(temp.last); // undefined
temp = null;
```

Instead of assigning a new property to a string, the code actually
creates a new property on a temporary object that is then destroyed.
When you try to access that property later, a different object is temporarily
created and the new property doesn't exist there. Although reference
values are created automatically for primitive values, when instanceof
checks for these types of values the result is false:

```javascript
var name = "Rol";
var count = 10;
var found = false;
console.log(name instanceof String); // false
console.log(count instanceof Number); // false
console.log(found instanceof Boolean); // false
```

The instanceof operator returns false because a temporary object is
created only when a value is read. Because instanceof doesn't actually read
anything, no temporary objects are created, and it tells us the values
aren't instances of primitive wrapper types. You can create primitive wrapper
types manually, but there are certain side effects:

```javascript
var name = new String("Rol");
var count = new Number(10);
var found = new Boolean(false);
console.log(typeof name); // "object"
console.log(typeof count); // "object"
console.log(typeof found); // "object"
```

As you can see, creating an instance of the primitive wrapper type
just creates another object, which means that typeof can't identify the type
of data you intend to store.
In addition, you can't use String, Number, and Boolean objects as you
would primitive values. For example, the following code uses a Boolean
object. The Boolean object is false, yet console.log("Found") still executes
because an object is always considered true inside a conditional statement.
It doesn't matter that the object represents false; it's an object, so it evaluates
to true.

```javascript
var found = new Boolean(false);
if (found) {
    console.log("Found"); // this executes
}
```

Manually instantiating primitive wrappers can also be confusing in
other ways, so unless you find a special case where it makes sense to do
so, you should avoid it. Most of the time, using primitive wrapper objects
instead of primitives only leads to errors.