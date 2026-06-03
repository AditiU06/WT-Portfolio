console.log("Hello");

//Type Inference
let x10 = 1500;
let msg = "Haloes";

//Annotation
let name2: string = "Bob";
let age1: number = 15;


let age2: number = 30;
console.log(age2);

let nam: string = "Mark";
console.log(nam);

let isActive: boolean = true;
console.log(isActive);

let emptyValue: null = null;
console.log(emptyValue);

let notAssign: undefined = undefined;
console.log(notAssign);

let unqId: symbol = Symbol("id");
console.log(unqId);


//Object Type
//Array
let numbers: number[] = [1, 2, 3, 4];
console.log(numbers);

//Class
class Person {
    name2: string;

    constructor(name2: string){
        this.name2 = name2;
    }

    greet(): void{
        console.log("Bonjour " + this.name2);
    }
}
let p = new Person("Keeho");
p.greet();

//Interface
interface User {
    name: string;
    age: number;
}
let user1: User = {
    name: "Kevin", 
    age: 29
};
console.log(user1);

//Function
function add(a: number, b: number): number {
    return a + b;
}
console.log(add(180, 320));

//Object
let person: { name: string, age: number} = {
    name: "Mark",
    age: 26
};
console.log(person);

//Tuple
let user: [string, number] = ["Yunjin", 30];
console.log(user);


//Enum
enum Color{
    Red,
    Green,
    Blue,
    Yellow
}
let myColor: Color = Color.Red;
console.log(myColor);


//Arithematic Operators
let a: number = 10;
let b: number = 5;

console.log(a + b);
console.log(a - b);
console.log(a / b);
console.log(a * b);
console.log(a % b);

//Logical Operators
let x: boolean = true;
let y: boolean = false;
console.log(x && y);
console.log(x || y);
console.log(!x);

//Relational Operators
let a1: number = 15;
let b1: number = 25;
console.log(a1 > b1);
console.log(a1 < b1);
console.log(a1 >= b1);
console.log(a1 <= b1);
console.log(a1 == b1);
console.log(a1 != b1);

//Bitwse Operators
let p3: number = 5; //0101
let q: number = 2; //0010
console.log(p3 & q);
console.log(p3 | q);
console.log(p3 ^ q);
console.log(~p3);
console.log(p3 << 1); //left shift
console.log(p3 >> 1); //right shift

//Assignment Operator
let s: number = 100;
s += 5
console.log(s);
s *= 5
console.log(s);
s -= 5
console.log(s);

//Ternary / Conditional Operator
let age: number = 10;
let result = (age >= 18) ? "Adult": "Minor";
console.log(result);

//String Operator
let firstName: string = "Mark";
let lastName: string = "Lee";

let fullName = firstName + " " + lastName;
console.log(fullName);


//Type Operator
let value: any = "Yooo";
console.log(typeof value);

//Typed Objects
let student: {title: string; price: number, isSold: boolean} = {
    title: "Last Of Us",
    price: 500,
    isSold: true
};
console.log(student);

//Error Handling
function divide(a: number, b:number): number {
    if(b==a)
        throw new Error("Division by 0");
    return a/b;
}
try {
    const result = divide(10, 0);
    console.log(result);
} catch(error) {
    console.error('An error occured:', error.message);
}
