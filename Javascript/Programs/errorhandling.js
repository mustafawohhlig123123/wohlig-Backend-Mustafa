//try catch block
try {
    let result = 10 / 0;
    // if (result === Infinity) {
    //     throw new Error("Division by zero results in Infinity");
    // }
    console.log(result);
} catch (error) {
    console.log("An error occurred:", error.message);
}
finally{
    console.log("heylo");
}
//finally block executes regardless

//creating custom errors by extending error class

class ValidationError extends Error {
    constructor(message) {
      super(message);  //Call the parent class constructor Error
      this.name = "ValidationError";//Custom error name
      this.statusCode = 400;//Custom error property
    }
  }
  
  try {
    let userInput = "";
    if (!userInput) {
      throw new ValidationError("User input cannot be empty");
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error.name);//ValidationError
      console.log(error.message); //"User input cannot be empty"
      console.log(error.statusCode); //400
    } else {
      console.log("An unknown error occurred:", error);
    }
  }
  