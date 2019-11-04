console.log("3"*5)

function sum(a, b){
    var sum = 0*a;
    console.log(sum +" is a "+typeof sum)
}

sum("3", 5)

var str = "Hello World!";
var res = str.valueOf();
console.log(res)

function Person(name) {
    Object.defineProperty(this, "name", {
    get: function() {
        return name;
    },
    set: function(newName) {
        name = newName;
    },
    enumerable: true,
    configurable: true
    });
    
    this.sayName = function() {
        console.log(this.name);
    };
    this.returnName = function() {
        return this.name;
    };
}

var pe1= new Person('Rolis');
//console.log(pe1.valueOf());
var x = pe1.valueOf().name
//console.log(x)
//x()
var book = {
    constructor:Person,
    title: "JavaScript"
};
    //     var message = "Book = " + book;
       // console.log(book.valueOf().title.toString());
        // var book = Object.create(pe1, {
        //     title: {
        //     configurable: true,
        //     enumerable: true,
        //     value: "JavaScript",
        //     writable: true
        //     }
        //     });
console.log(book.valueOf())