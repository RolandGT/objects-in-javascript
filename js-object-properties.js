var person1 = {
    name: "P1"
};
var descriptor = Object.getOwnPropertyDescriptor(person1, "name");
console.log(descriptor.enumerable); // true
console.log(descriptor.configurable); // true
console.log(descriptor.writable); // true
console.log(descriptor.value); // "P1"

var person2 = {};
person2.name = "P2"
var descriptor2 = Object.getOwnPropertyDescriptor(person2, "name");
console.log(descriptor2.enumerable); // true
console.log(descriptor2.configurable); // true
console.log(descriptor2.writable); // true
console.log(descriptor2.value); // "P2"

var person3 = {}
Object.defineProperty(person3, "name", {value : "P3"});
var descriptor3 = Object.getOwnPropertyDescriptor(person3, "name");
console.log(descriptor3.enumerable); // false
console.log(descriptor3.configurable); // false
console.log(descriptor3.writable); // false
console.log(descriptor3.value); // "P3"

var person4 = {
    get name() {
    console.log("Reading name");
    return this._name;
    },
    set name(value) {
        console.log("Setting name to %s", value);
        this._name = value;
    }
};
// if object property is set using defineProperty enumerable, configurable, writable by defaut Boolean are falsy
Object.defineProperty(person4, "_name", {value : "P4-00"}); // 
person4._name = "P4-updated"; // this update wont work because writable is false


var descriptor4 = Object.getOwnPropertyDescriptor(person4, "_name");
console.log(descriptor4.enumerable); // false
console.log(descriptor4.configurable); // false
console.log(descriptor4.writable); // false
console.log(descriptor4.value); // "P4-00"


var person5 = {
    _name : "P5-00", // if value is defined inside object literal: enumerable, configurable, writable will be automatically set to true
    get name() {
    console.log("Reading name");
    return this._name;
    },
    set name(value) {
        console.log("Setting name to %s", value);
        this._name = value;
    }
};
// if object property is set using defineProperty enumerable, configurable, writable by defaut Boolean are falsy,
// but in this case values are already true , because _name value was defined and set in object literal
Object.defineProperty(person5, "_name", {value : "P5-01"}); // _name will be set to P5-01
person5._name = "P5-updated"; // _name will be set to P5-updated


var descriptor5 = Object.getOwnPropertyDescriptor(person5, "_name");
console.log(descriptor5.enumerable); // false
console.log(descriptor5.configurable); // false
console.log(descriptor5.writable); // false
console.log(descriptor5.value); // "P5-updated"