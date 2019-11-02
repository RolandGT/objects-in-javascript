# The "this" object

Every scope in JavaScript has a this object that represents the calling
object for the function. In the global scope, this represents the
global object (window in web browsers). When a function is called while
attached to an object, the value of this is equal to that object by default.
So, instead of directly referencing an object inside a method, you can reference
this instead.

```javascript
var person = {
    name: "Rol",
    sayName: function() {
        console.log(this.name);
    }
};
person.sayName(); // outputs "Rol"
```
That means you can easily change the
name of the variable or even reuse the function on different objects.

```javascript
function sayNameForAll() {
    console.log(this.name);
}
var person1 = {
    name: "Rol",
    sayName: sayNameForAll
};
var person2 = {
    name: "Ged",
    sayName: sayNameForAll
};
var name = "Tro";
person1.sayName(); // outputs "Rol"
person2.sayName(); // outputs "Ged"
sayNameForAll(); // outputs "Tro"

```
In this example, a function called sayName is defined first. Then,
two object literals are created that assign sayName to be equal to the
sayNameForAll
function. Functions are just reference values, so you can
assign them as property values on any number of objects. When sayName()
is called on person1, it outputs "Rol"; when called on person2, it outputs
"Ged". That’s because this is set when the function is called, so
this.name is accurate.
The last part of this example defines a global variable called name.
When sayNameForAll() is called directly, it outputs "Tro" because the
global variable is considered a property of the global object.


# Changing "this"
The ability to use and manipulate the this value of functions is key to
good object-oriented programming in JavaScript. Functions
can be used
in many different contexts, and they need to be able to work in each situation.
Even though this is typically assigned automatically, you can change
its value to achieve different goals. There are three function methods that
allow you to change the value of this. (Remember that functions are
objects, and objects can have methods, so functions can, too.)

## The call() Method
The first function method for manipulating this is call(), which executes
the function with a particular this value and with specific parameters.
The first parameter of call() is the value to which this should be equal
when the function is executed. All subsequent parameters are the parameters
that should be passed into the function. For example, suppose you
update sayNameForAll() to take a parameter:


```javascript
function sayNameForAll(label) {
    console.log(label + ":" + this.name);
}
var person1 = {
    name: "Rol"
};
var person2 = {
    name: "Ged"
};
var name = "Tro";
sayNameForAll.call(this, "global"); // outputs "global:Tro"
sayNameForAll.call(person1, "person1"); // outputs "person1:Rol"
sayNameForAll.call(person2, "person2"); // outputs "person2:Ged"

```
In this example, sayNameForAll() accepts one parameter that is used
as a label to the output value. The function is then called three times.
Notice that there are no parentheses after the function name because it
is accessed as an object rather than as code to execute. The first function
call uses the global this and passes in the parameter "global" to output
"global:Michael". The same function is called two more times, once each
for person1 and person2.
Because the call() method is being used, you
don’t need to add the function directly onto each object—you explicitly
specify the value of this instead of letting the JavaScript engine do it
automatically.

## The apply() Method
The second function method you can use to manipulate this is apply(). The
apply() method works exactly the same as call() except that it accepts only
two parameters: the value for this and an array or array-like object of
parameters to pass to the function (that means you can use an arguments
object as the second parameter). So, instead of individually naming each
parameter using call(), you can easily pass arrays to apply() as the second
argument. Otherwise, call() and apply() behave identically. This example
shows the apply() method in action:


```javascript
function sayNameForAll(label) {
    console.log(label + ":" + this.name);
}
var person1 = {
    name: "Rol"
};
var person2 = {
    name: "Ged"
};
var name = "Tro";
sayNameForAll.apply(this, ["global"]); // outputs "global:Tro"
sayNameForAll.apply(person1, ["person1"]); // outputs "person1:Rol"
sayNameForAll.apply(person2, ["person2"]); // outputs "person2:Ged"

```
This code takes the previous example and replaces call() with
apply(); the result is exactly the same. The method you use typically
depends on the type of data you have. If you already have an array of
data, use apply(); if you just have individual variables, use call().

## The bind() Method
The third function method for changing this is bind(). This method was
added in ECMAScript 5, and it behaves quite differently than the other
two. The first argument to bind() is the this value for the new function.
All other arguments represent named parameters that should be permanently
set in the new function. You can still pass in any parameters that
aren’t permanently set later.
The following code shows two examples that use bind(). You create
the sayNameForPerson1() function by binding the this value to person1, while
sayNameForPerson2() binds this to person2 and binds the first parameter as
"person2".

```javascript
function sayNameForAll(label) {
    console.log(label + ":" + this.name);
}
var person1 = {
    name: "Rol"
};
var person2 = {
    name: "Ged"
};
// create a function just for person1
//1
 var sayNameForPerson1 = sayNameForAll.bind(person1);
sayNameForPerson1("person1"); // outputs "person1:Rol"
// create a function just for person2
//2
 var sayNameForPerson2 = sayNameForAll.bind(person2, "person2");
sayNameForPerson2(); // outputs "person2:Ged"
// attaching a method to an object doesn't change 'this'
//3
 person2.sayName = sayNameForPerson1;
person2.sayName("person2"); // outputs "person2:Rol"

```

No parameters are bound for sayNameForPerson1() 1, so you still need
to pass in the label for the output. The function sayNameForPerson2() not
only binds this to person2 but also binds the first parameter as "person2" 2.
That means you can call sayNameForPerson2()
without passing in any additional
arguments. The last part of this example adds sayNameForPerson1()
onto person2 with the name sayName 3. The function is bound, so the value
of this doesn’t change even though sayNameForPerson1 is now a function on
person2. The method still outputs the value of person1.name.
