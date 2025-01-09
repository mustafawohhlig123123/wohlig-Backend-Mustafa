//classes and inheritance
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks`);
  }
}

const dog = new Dog('Buddy');
dog.speak();  // "Buddy barks"

//promises and async/await
//Promise
const fetchData = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Data fetched successfully");
  } else {
    reject("Error fetching data");
  }
});

fetchData.then((message) => {
  console.log(message);
}).catch((error) => {
  console.error(error);
});

//async fnction
async function fetchDataAsync() {
    try {
      const data = await fetchData;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchDataAsync();
  //generators are functions that can pause or resume their execution using  yield keyword
  function* countUpTo(max) {
    let count = 0;
    while (count <= max) {
      yield count;  // Pause the function and return the current value
      count++;
    }
  }
  
  const counter = countUpTo(5);
  console.log(counter.next().value); // 0
  console.log(counter.next().value); // 1
  console.log(counter.next().value); // 2
  console.log(counter.next().value);//3
  console.log(counter.next().value);//4
  console.log(counter.next().value);//5
  console.log(counter.next().value);//undefined

  //example of async/awairt
  function fetchData(){
    return new Promise ((resolve,reject) =>{
        setTimeout(() => {
            resolve("data fetched");
        } , 2000);
    });
  }
  async function getData(){
    const data = await fetchData();
    console.log(data)
  }
  getData();