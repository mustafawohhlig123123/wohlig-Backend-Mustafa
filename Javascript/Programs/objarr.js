class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  greet() {
      return `Hello, my name is ${this.name}.`;
    }
  }
  const person1 = new Person("Mustafa", 30);
  console.log(person1.greet())
  //creating a obj tp class and calling it
  //object is a collection of key-value pairs

const person = { name: "Alice", age: 30,  };
console.log(person.name); 
console.log(person["age"]);//bracket notation used when dynamic value or string
//array methods
let arr = [3,4,5]
arr.push(6)
console.log("abc");

console.log(arr);
arr.pop()
console.log(arr)
//tp remove specific elemetn use filter hof or splice
//or slice for a rnage of eleemnts deletion from arr
//iterating over arrays
const ar = [10, 20, 30];
for (let i = 0; i < ar.length; i++) {
  console.log(ar[i]);
}
for (let num of arr) {
  console.log(num);
}
arr.forEach((num) => console.log(num));

//destructing
const numbers = [10, 20, 30];
const [a, b, c] = numbers;
console.log(a, b, c); // Output: 10 20 30
//obj desturcting above is array destructing
const person2 = { nameee: "Alice", age: 30 };
const { nameee2, age } = person2;
console.log(nameee2, age); 

//spread operator common uses
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
console.log(arr2);//Output [1,2,3]

const arrr1 = [1, 2];
const arrr2 = [3, 4];
const combined = [...arrr1, ...arrr2];
let arr3 = arrr1.concat(arrr2)
// console.log(combined); // Output: [1, 2, 3, 4]
console.log("arr3:" + arr3);


//rest operator
const [p, o, ...rest] = [1, 2, 3, 4, 5];
console.log(rest); // Output: [3, 4, 5]

//using both rest and spread together
function combineArrays(arr1, ...arr2) {
  return [...arr1, ...arr2];
}
console.log(combineArrays([1, 2], 3, 4, 5)); 
// Output: [1, 2, 3, 4, 5]


