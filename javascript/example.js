"use strict";
console.log("Hello");
// Compile: tsc filename.ts
//Run: node filename.js
let age = 20;
console.log(age);
let name1 = "Chinz";
console.log(name1);
let isChinz = true;
console.log(isChinz);
let empValue = null;
console.log(empValue);
let notAssign = undefined;
console.log(notAssign);
let uniqueId = Symbol("id");
console.log(uniqueId);
// Array
let numbers = [1, 2, 3, 4];
console.log(numbers);
// Class
class Person {
    name1;
    constructor(name1) {
        this.name1 = name1;
    }
    greet() {
        console.log("Hello " + this.name1);
    }
}
let p = new Person("Chinz");
p.greet();
let user = {
    name2: "Bob",
    age: 23
};
console.log(user);
// Function
function add(a, b) {
    return a + b;
}
console.log(add(2, 4));
//Object
let person = {
    name3: "Louiz",
    age: 43
};
console.log(person);
// Tuple
let user4 = ["Pop", 33];
console.log(user4);
// Enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let myColor = Color.Green;
console.log(myColor);
//Inference
// Compiler automatically detects the type
let x = 10; //infered as number
let msg = "Hi";
//Annotation
// Developer define the type explicitly
let age1 = 10;
//console.log(age);
let msg1 = "Hi";
//console.log(msg1)
//Arithmatic Operators
let a3 = 10;
let b3 = 5;
console.log(a3 + b3); //Addition
console.log(a3 - b3); //Subtractiob
console.log(a3 * b3); //Multiplication
console.log(a3 / b3); //Division
console.log(a3 % b3); //Modulus
//Logical Operators
let x1 = true;
let y1 = false;
console.log(x1 && y1); //AND
console.log(x1 || y1); //OR
console.log(!x1); //NOT
// Relational Operator
let c = 10;
let d = 5;
console.log(c > d);
console.log(c < d);
console.log(c >= d);
console.log(c <= d);
console.log(c == d);
console.log(c != d);
// Bitwise Operators
let a2 = 5; //0101
let b2 = 3; //0011
console.log(a2 & b2); //AND
console.log(a2 | b2); //OR
console.log(a2 ^ b2); //XOR
console.log(~a2); //NOT
console.log(a2 << 1); //LEFT SHIFT
console.log(a2 >> 1); //RIGHT SHIFT
//Assignment Operator
let e = 10;
e += 5;
console.log(e);
e -= 3;
console.log(e);
e += 2;
console.log(e);
// Ternary/Conditional Operator
let ageP = 18;
let result = (ageP >= 18) ? "Adult" : "Minor";
console.log(result);
//String Operator
let firstName = "John";
let lastName = "Robin";
let fullName = firstName + " " + lastName;
console.log(fullName);
//Type Operator
let value = "hello";
console.log(typeof value); //string
//Typed Objects
//Objcts can be given a specific structure using type annotations, ensuring onject must follow defined shape
let hospital = {
    pname: "Doe",
    pid: 235
};
// TypeScript Error Handling
//function divide(a: number, b: number): number {
//   if(b==0){
//        throw new Error('Division by 0');
//    }
//    return a/b;
//}
//try{
//    const result = divide(10,0);
//    console.log(result);
//} catch(error) {
//console.error("An error occured",error.message);
//}
//
let f = ["apple", "mango", "strawberry"];
for (let fruit of f) {
    let output = `fruit: ${f}`;
    document.getElementById("output").innerHTML = output;
}
