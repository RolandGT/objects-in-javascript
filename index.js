// Another unique aspect of JavaScript functions is that you can pass any
// number of parameters to any function without causing an error. That’s
// because function parameters are actually stored as an array-like structure
// called arguments.
// The arguments object is not an instance of Array and therefore doesn’t have the
// same methods as an array; Array.isArray(arguments) always returns false.

// The number of arguments a function expects is stored
// on the function’s length property. Remember, a function is actually just an
// object, so it can have properties. The length property indicates the function’s
// arity, or the number of parameters it expects. Knowing the function’s
// arity is important in JavaScript because functions won’t throw an error if
// you pass in too many or too few parameters.

reflect = function() {
    return arguments[0];
};

//The number of arguments a function expects is stored on the function’s length property
function functionWithNamedArguments(label, label1) { // label1 and label2 are parameters of a function
    console.log(functionWithNamedArguments.length); 
}
function functionWithoutNamedArguments() {
    console.log(functionWithoutNamedArguments.length);
}

reflect = function() {
    return arguments[0];
};

console.log(reflect("Hi!")); // "Hi!"
console.log(reflect("Hi!", 25)); // "Hi!"
console.log(reflect.length); // 0

// The arguments object is automatically available inside any function. This
// means named parameters in a function exist mostly for convenience and
// don’t actually limit the number of arguments that a function can accept.

// The version that uses the arguments object can be confusing because there
// are no named arguments, and you must read the body of the function to
// determine if arguments are used. That is why many developers prefer to
// avoid using arguments unless necessary.

// Sometimes, however, using arguments is actually more effective than
// naming parameters. For instance, suppose you want to create a function
// that accepts any number of parameters and returns their sum. You can’t
// use named parameters because you don’t know how many you will need,
// so in this case, using arguments
// is the best option.

function sum() {
    var result = 0,
    i = 0,
    len = arguments.length;
    while (i < len) {
    result += arguments[i];
    i++;
    }
    return result;
    }
    console.log(sum(1, 2)); // 3
    console.log(sum(3, 4, 5, 6)); // 18
    console.log(sum(50)); // 50
    console.log(sum()); // 0


function sayNameForAll() {
    console.log(arguments[0] + ", " + arguments[4] +":" + this.name);
    console.log(sayNameForAll.length);
}
var person1 = {
    name: "Rolandas"
};   
functionWithNamedArguments(); // outputs 2
functionWithoutNamedArguments(); // outputs 0
sayNameForAll.apply(person1, ["arr1", "arr2", "arr3", "arr4","arr5"]); // outputs "arr1, arr5:Rolandas"


function saySomething() {
    console.log(arguments[2] + ":" + this.name);
}
var personA = {
    name: "Rol"
};
    
saySomething.call(personA, "personA", "personB", "personC"); // outputs ""personC:Rol""