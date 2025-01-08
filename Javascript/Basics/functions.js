function myapp(name){
    console.log(`hello ${name}`);
}
a = "mee"
myapp(a)

//implicit function

const square = x => x*x
console.log(square(5)) 

//high order function
//built in hofs
const numbers = [1, 2, 3, 4];
const squared = numbers.map((num) => num * num);
console.log(squared); // Output: [1, 4, 9, 16]

const numbers2 = [10, 20, 30, 5];
const aboveFifteen = numbers2.filter((num) => num > 15);
console.log(aboveFifteen); // Output: [20, 30]

const numbers3 = [1, 2, 3, 4];
const sum = numbers3.reduce((total, num3) => total + num3, 0);
console.log(sum); // Output: 10

const colors = ["red", "green", "blue"];
colors.forEach((color) => console.log(color));
// Output: red, green, blue

//custom hof
function apply(func) {
    return function (value) {
      return func(value);
    };
  }
  
  const square1 = (x) => x * x;
  
  const applySquare = apply(square1);
  
  console.log(applySquare(5)); // 25
  
 // callback function
  function fetchData(callback) {
    console.log("Fetching data...");
    setTimeout(() => {
      callback("Data fetched successfully!");
    }, 2000);
  }
  
  function processData(data) {
    console.log(data);
  }
  
  fetchData(processData);
  // Output:
  // Fetching data...
  //  Data fetched successfully!
  
  //closures
  function createCounter() {
    let count = 0; // Private variable
    return function() {
      count++;
      return count;
    };
  }
  
  const counter = createCounter();
  console.log(counter()); // Output: 1
  console.log(counter()); // Output: 2
  