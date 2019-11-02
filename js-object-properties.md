# Defining Properties
There are two basic ways to create your own
objects: using the Object constructor and using an object literal.

```javascript
var person1 = {
name: "Rol"
};
var person2 = new Object();
person2.name = "Ged";
```
When a property is first added to an object, JavaScript uses an internal
method called **[[Put]]** on the object. The **[[Put]]** method creates a
spot in the object to store the property. 

This operation specifies not just
the initial value, but also some attributes of the property. So, in the previous
example, when the name property is first defined on object, the **[[Put]]** method is invoked.

The result of calling **[[Put]]** is the creation of an own property on
the object. An own property simply indicates that the specific instance
of the object owns that property. The property is stored directly on the
instance, and all operations on the property must be performed through
that object.

When a new value is assigned to an existing property, a separate
operation
called **[[Set]]** takes place. This operation replaces the current value
of the property with the new one.

```javascript
var person1 = {
name: "Rol" // put
};
person1.name = "Rol-updated" // set
```

## Detecting Properties

Because properties can be added at any time, it’s sometimes necessary to
check whether a property exists in the object.
Commonly it is done in a wrong way:

```javascript
// unreliable
if (person1.age) {
// do something with age
}
```

The problem with this pattern is how JavaScript’s type coercion affects
the outcome. The if condition evaluates to true if the value is truthy (an
object, a nonempty string, a nonzero number, or true) and evaluates to
false if the value is falsy (null, undefined, 0, false, NaN, or an empty string).
Because an object property can contain one of these falsy values, the
example code can yield false negatives. For instance, if person1.age is 0,
then the if condition will not be met even though the property exists.
A more reliable way to test for the existence of a property is with the in
operator.
The in operator looks for a property with a given name in a specific
object and returns true if it finds it. In effect, the in operator checks to see
if the given key exists in the hash table. For example, here’s what happens
when in is used to check for some properties in the person1 object:

```javascript
console.log("name" in person1); // true
console.log("title" in person1); // false
```

Keep in mind that methods are just properties that reference functions,
so you can check for the existence of a method in the same way.
The following adds a new function, sayName(), to person1 and uses in to
confirm the function’s presence.

```javascript
var person1 = {
    name: "P1",
    sayName: function() {
        console.log(this.name);
    }
};
console.log("sayName" in person1); // true
```

In some cases, however, you might want to check for the existence of
a property only if it is an own property. The in operator checks for both
own properties and prototype properties, so you’ll need to take a different
approach. Enter the hasOwnProperty() method, which is present on all objects
and returns true only if the given property exists and is an own property.
For example, the following code compares the results of using in versus
hasOwnProperty()
on different properties in person1:

```javascript
var person1 = {
    name: "P1",
    sayName: function() {
        console.log(this.name);
    }
};
console.log("name" in person1); // true
console.log(person1.hasOwnProperty("name")); // true
console.log("toString" in person1); // true
console.log(person1.hasOwnProperty("toString")); // false
```

## Removing Properties

Just as properties can be added to objects at any time, they can also be
removed. Simply setting a property to null doesn’t actually remove the
property completely from the object, though. Such an operation calls
[[Set]] with a value of null, which, as you saw earlier in the chapter, only
replaces the value of the property. You need to use the delete operator to
completely remove a property from an object.
The delete operator works on a single object property and calls an
internal operation named [[Delete]]. You can think of this operation as
removing a key/value pair from a hash table. When the delete operator is
successful, it returns true.

```javascript
var person1 = {
    name: "P1"
};
console.log("name" in person1); // true
delete person1.name; // true - not output
console.log("name" in person1); // false
console.log(person1.name); // undefined
```

In this example, the name property is deleted from person1. The
in operator returns false after the operation is complete. Also, note
that attempting to access a property that doesn’t exist will just return
undefined.

## Enumeration

By default, all properties that you add to an object are enumerable, which
means that you can iterate over them using a for-in loop. Enumerable
properties have their internal [[Enumerable]] attributes set to true.


```javascript
var property;
for (property in object) {
    console.log("Name: " + property);
    console.log("Value: " + object[property]);
}
```

If you just need a list of an object’s properties to use later in your program,
ECMAScript 5 introduced the Object.keys() method to retrieve an
array of enumerable property names, as shown here:

```javascript
var properties = Object.keys(object);
// if you want to mimic for-in behavior
var i, len;
for (i=0, len=properties.length; i < len; i++){
    console.log("Name: " + properties[i]);
    console.log("Value: " + object[properties[i]]);
}
```

This example uses Object.keys() to retrieve the enumerable properties
from an object. A for loop is then used to iterate over the properties
and output the name and value. Typically, you would use Object.keys() in
situations where you want to operate on an array of property names and
for-in when you don’t need an array.

There is a difference between the enumerable properties returned in a for-
in loop
and the ones returned by Object.keys(). The for-in loop also enumerates prototype
properties, while Object.keys() returns only own (instance) properties.

Keep in mind that not all properties are enumerable. In fact, most
of the native methods on objects have their [[Enumerable]] attribute set
to false. You can check whether a property is enumerable by using the
propertyIsEnumerable()
method, which is present on every object:

```javascript
person1 = {
    name: "Nicholas"
};
console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")); // true
var properties = Object.keys(person1);
console.log("length" in properties); // true
console.log(properties.propertyIsEnumerable("length")); // false
```

Here, the property name is enumerable, as it is a custom property
defined on person1. The length property for the properties
array, on
the other hand, is not enumerable because it’s a built-in property on
Array.prototype. You’ll find that many native properties are not enumerable
by default.

## Types of Properties

There are two different types of properties: data properties and accessor
properties. Data properties contain a value, like the name property from earlier
examples in this chapter. The default behavior of the [[Put]] method
is to create a data property.

Accessor properties don’t contain a value
but instead define a function to call when the property is read (called
a getter), and a function to call when the property is written to (called a
setter). Accessor properties only require either a getter or a setter, though
they can have both.
There is a special syntax to define an accessor property using an
object literal:

```javascript
var person1 = {
    _name: "P1",
    get name() {
        console.log("Reading name");
        return this._name;
    },
    set name(value) {
        console.log("Setting name to %s", value);
        this._name = value;
    }
};
console.log(person1.name); // "Reading name" then "P1"
person1.name = "P1-updated";
console.log(person1.name); // "Setting name to P1-updated" then "P1-updated"
```

This example defines an accessor property called name. There is a data
property called _name that contains the actual value for the property.
(The leading underscore is a common convention to indicate that the
property is considered to be private, though in reality it is still public.)
The syntax used to define the getter and setter for name looks a lot
like a function but without the function keyword.

This example simply adds logging to the behavior of the property; there’s
usually no reason to use accessor properties if you are only storing the
data in another property—just use the property itself. Accessor properties
are most useful when you want the assignment of a value to trigger some
sort of behavior, or when reading a value requires the calculation of the
desired return value.

# Property Attributes

Prior to ECMAScript 5, there was no way to specify whether a property
should be enumerable. In fact, there was no way to access the internal
attributes of a property at all. ECMAScript 5 changed this by introducing
several ways of interacting with property attributes directly, as well
as introducing new attributes to support additional functionality. It’s
now possible to create
properties that behave the same way as builtin
JavaScript properties.

## Common Attributes

There are two property attributes shared between data and accessor
properties. One is [[Enumerable]], which determines whether you can
iterate
over the property. The other is [[Configurable]], which determines
whether the property can be changed. You can remove a configurable
property using delete and can change its attributes at any time. (This also
means configurable properties can be changed from data to accessor
properties and vice versa.) By default, all properties you declare on an
object are both enumerable and configurable.

If you want to change property attributes, you can use the Object
.defineProperty() method. This method accepts three arguments: the
object that owns the property, the property name, and a property descriptor
object containing the attributes to set. The descriptor has properties
with the same name as the internal attributes but without the square
brackets. So you use enumerable
to set [[Enumerable]], and configurable
to set [[Configurable]]. For example, suppose you want to make an object
property nonenumerable and nonconfigurable:

```javascript
var person1 = {
    name: "P1"
};
Object.defineProperty(person1, "name", {
    enumerable: false
});
console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")); // false
var properties = Object.keys(person1);
console.log(properties.length); // 0
Object.defineProperty(person1, "name", {
    configurable: false
});
// try to delete the Property
delete person1.name;
console.log("name" in person1); // true
console.log(person1.name); // "P1"
Object.defineProperty(person1, "name", { // error!!!
    configurable: true
});
```
The name property is defined as usual, but it’s then modified to set
its [[Enumerable]] attribute to false. The propertyIsEnumerable()
method
now returns false because it references the new value of [[Enumerable]].

After that, name is changed to be nonconfigurable. From now on,
attempts to delete name fail because the property can’t be changed, so
name is still present on person1. Calling Object.defineProperty() on name
again would also result in no further changes to the property. Effectively,
name is locked down as a property on person1.

The last piece of the code tries to redefine name to be configurable
once again. However, this throws an error because you can’t make a
nonconfigurable property configurable again. Attempting to change a
data property into an accessor property or vice versa should also throw
an error in this case.

## Data Property Attributes

Data properties possess two additional attributes that accessors do not.
The first is [[Value]], which holds the property value. This attribute is
filled in automatically when you create a property on an object. All property
values are stored in [[Value]], even if the value is a function.
The second attribute is [[Writable]], which is a Boolean value indicating
whether the property can be written to. By default, all properties are
writable unless you specify otherwise.
With these two additional attributes, you can fully define a data property
using Object.defineProperty() even if the property doesn’t already exist.
Consider this code:

```javascript
var person1 = {
    name: "P1"
};
```

It adds the name
property to person1 and sets its value. You can achieve the same result
using the following (more verbose) code:


```javascript
var person1 = {};
Object.defineProperty(person1, "name", {
    value: "P1",
    enumerable: true,
    configurable: true,
    writable: true
});
```

When Object.defineProperty() is called, it first checks to see if the
property exists. If the property doesn’t exist, a new one is added with
the attributes specified in the descriptor. In this case, name isn’t already
a property of person1, so it is created.

When you are defining a new property with Object.defineProperty(),
it’s important to specify all of the attributes because Boolean attributes
automatically default to false otherwise.
For example, the following code
creates a name property that is nonenumerable, nonconfigurable, and
nonwritable because it doesn’t explicitly make any of those attributes
true in the call to Object.defineProperty().

```javascript
var person1 = {};
Object.defineProperty(person1, "name", {
    value: "P1"
});
console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")); // false
delete person1.name;
console.log("name" in person1); // true
person1.name = "P1-updated";
console.log(person1.name); // "P1-updated"
```

In this code, you can’t do anything with the name property except
read the value; every other operation is locked down. If you’re changing
an existing property, keep in mind that only the attributes you specify will
change.

## Accessor Property Attributes

Accessor properties also have two additional attributes. Because there
is no value stored for accessor properties, there is no need for [[Value]]
or [[Writable]]. Instead, accessors have [[Get]] and [[Set]], which contain
the getter and setter functions, respectively. As with the object literal form
of getters and setters, you need only define one of these attributes to
create
the property.

If you try to create a property with both data and accessor attributes, you will get
an error.

The advantage of using accessor property attributes instead of object
literal notation to define accessor properties is that you can also define
those properties on existing objects. If you want to use object literal notation,
you have to define accessor properties when you create the object.
As with data properties, you can also specify whether accessor properties
are configurable or enumerable. Consider this example from earlier:

```javascript
var person1 = {
    _name: "P1",
    get name() {
    console.log("Reading name");
    return this._name;
    },
    set name(value) {
        console.log("Setting name to %s", value);
        this._name = value;
    }
};
```

This code can also be written as follows:

```javascript
var person1 = {
    _name: "P1"
};

Object.defineProperty(person1, "name", {
    get: function() {
        console.log("Reading name");
        return this._name;
    },
    set: function(value) {
        console.log("Setting name to %s", value);
        this._name = value;
    },
    enumerable: true,
    configurable: true
});
```

Notice that the get and set keys on the object passed in to Object
.defineProperty() are data properties that contain a function. You can’t
use object literal accessor format here.
Setting the other attributes ([[Enumerable]] and [[Configurable]]) allows
you to change how the accessor property works. For example, you can
create
a nonconfigurable, nonenumerable, nonwritable property like this:

```javascript
var person1 = {
    _name: "P1"
};

Object.defineProperty(person1, "name", {
    get: function() {
        console.log("Reading name");
        return this._name;
    }
});
console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")); // false
delete person1.name;
console.log("name" in person1); // true
person1.name = "P1-updated";
console.log(person1.name); // "P1"
```

In this code, the name property is an accessor property with only a
getter. There is no setter or any other attributes to explicitly set to true,
so the value can be read but not changed.

## Defining Multiple Properties

It’s also possible to define multiple properties on an object simultaneously
if you use Object.defineProperties() instead of Object.defineProperty(). This
method accepts two arguments: the object to work on and an object containing
all of the property information. The keys of that second argument
are property names, and the values are descriptor objects defining the
attributes for those properties. For example, the following code defines
two properties:

```javascript
var person1 = {};
Object.defineProperties(person1, {
    // data property to store data
    _name: {
        value: "P1",
        enumerable: true,
        configurable: true,
        writable: true
    },
    // accessor property
    name: {
        get: function() {
        console.log("Reading name");
        return this._name;
        },
        set: function(value) {
            console.log("Setting name to %s", value);
            this._name = value;
        },
        enumerable: true,
        configurable: true
    }
});
```

This example defines _name as a data property to contain information
and name as an accessor property. You can define any number
of properties using Object.defineProperties();
you can even change existing
properties and create new ones at the same time. The effect is the same
as calling Object.defineProperty()
multiple times.

## Retrieving Property Attributes

If you need to fetch property attributes, you can do so in JavaScript
by
using Object.getOwnPropertyDescriptor(). As the name suggests, this method
works only on own properties. This method accepts two arguments: the
object to work on and the property name to retrieve. If the property exists,
you should receive a descriptor object with four properties: configurable,
enumerable, and the two others appropriate for the type of property. Even
if you didn’t specifically set an attribute, you will still receive an object
containing the appropriate value for that attribute. For example, this
code creates a property and checks its attributes:

```javascript
var person1 = {
    name: "P1"
};
var descriptor = Object.getOwnPropertyDescriptor(person1, "name");
console.log(descriptor.enumerable); // true
console.log(descriptor.configurable); // true
console.log(descriptor.writable); // true
console.log(descriptor.value); // "P1"
```

Here, a property called name is defined as part of an object literal. The
call to Object.getOwnPropertyDescriptor() returns an object with enumerable,
configurable, writable, and value, even though these weren’t explicitly
defined via Object.defineProperty().