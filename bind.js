function sayNameForAll() {
    var obj = this;
    return{
        sayName : function(label){console.log(label +":" + obj.name)},
        sum : obj.sum_ab
    }
}

var person1 = {
name: "Rol",
sum_ab: function(a,b){return console.log(a+b)}
};

var person2 = {
name: "Ged",
sum_ab: function(a,b){return console.log(a-b)}
};

// create a function just for person1
var sayNameForPerson1 = sayNameForAll.bind(person1);
var sayNameForPerson2 = sayNameForAll.bind(person2);

sayNameForPerson1().sayName('person1'); // outputs "person1:Rol"
sayNameForPerson1().sum(2,1); // outputs "3"

sayNameForPerson2().sayName('person2'); // outputs "person2:Ged"
sayNameForPerson2().sum(2,1); // outputs "1"

///////////////////////////////////////

function sayNameForAllR(label) {
    console.log(label + ":" + this.name);
}
var personR = {
    name: "Rolis"
};

// passing object and a label, which wil be remembered in the closure "sayNameForPersonR"
var sayNameForPersonR = sayNameForAllR.bind(personR, "personR"); 
// in this case label is remembered, because of a closure
sayNameForPersonR(); 