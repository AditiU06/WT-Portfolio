"use strict" ;
console.log("Hello")

// Compile: tsc filename.ts
//Run: node filename.js

let age: number = 20;
console.log(age);

let name1: string = "Chinz";
console.log(name1);

let isChinz: boolean = true;
console.log(isChinz);

let empValue: null = null;
console.log(empValue);

let notAssign: undefined = undefined;
console.log(notAssign);

let uniqueId: symbol = Symbol("id");
console.log(uniqueId);

// Array
let numbers: number[]= [1,2,3,4];
console.log(numbers);

// Class
class Person{
    name1: String;
    constructor(name1: String){
        this.name1=name1;
    }
    greet(): void {
        console.log("Hello " +this.name1);
    }
}
let p = new Person("Chinz");
p.greet();

// Interface
interface User{
    name2: string;
    age: number;
}
let user: User={
    name2: "Bob",
    age: 23
};
console.log(user);

// Function
function add(a: number, b: number): number{
    return a+b;
}
console.log(add(2,4));

//Object
let person: {name3: string; age: number} = {
    name3: "Louiz",
    age: 43
};
console.log(person);

// Tuple
let user4: [string, number] = ["Pop", 33];
console.log(user4);

// Enum
enum Color{
    Red,
    Green,
    Blue
}
let myColor: Color= Color.Green;
console.log(myColor);

//Inference
// Compiler automatically detects the type
let x=10; //infered as number
let msg="Hi";

//Annotation
// Developer define the type explicitly
let age1: number = 10;
//console.log(age);
let msg1: string = "Hi";
//console.log(msg1)

//Arithmatic Operators
let a3: number = 10;
let b3: number = 5;
console.log(a3+b3);  //Addition
console.log(a3-b3);  //Subtractiob
console.log(a3*b3);  //Multiplication
console.log(a3/b3);  //Division
console.log(a3%b3);  //Modulus

//Logical Operators
let x1: boolean = true;
let y1: boolean = false;
console.log(x1 && y1); //AND
console.log(x1 || y1); //OR
console.log(!x1); //NOT

// Relational Operator
let c: number = 10;
let d: number = 5;
console.log(c>d);
console.log(c<d);
console.log(c>=d);
console.log(c<=d);
console.log(c==d);
console.log(c!=d);

// Bitwise Operators
let a2: number = 5; //0101
let b2: number = 3; //0011
console.log(a2 & b2); //AND
console.log(a2 | b2); //OR
console.log(a2 ^ b2); //XOR
console.log(~a2); //NOT
console.log(a2 << 1); //LEFT SHIFT
console.log(a2 >> 1); //RIGHT SHIFT

//Assignment Operator
let e: number = 10;
e+=5;
console.log(e);
e-=3;
console.log(e);
e+=2;
console.log(e);

// Ternary/Conditional Operator
let ageP: number = 18;
let result = (ageP>=18)? "Adult" : "Minor";
console.log(result);

//String Operator
let firstName: string = "John";
let lastName: string = "Robin";
let fullName= firstName +" "+lastName;
console.log(fullName);

//Type Operator
let value: any = "hello";
console.log(typeof value);  //string

//Typed Objects
//Objcts can be given a specific structure using type annotations, ensuring onject must follow defined shape
let hospital: {pname: string; pid: number}={
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
let f: string[] = ["apple", "mango", "strawberry"];
for(let fruit of f) {
    let output = `fruit: ${f}` ;
    document.getElementById("output")!.innerHTML = output;
}