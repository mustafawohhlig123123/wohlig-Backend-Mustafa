//callback hell with nested asynchronous functions
function getData(callback) {
    setTimeout(() => {
      callback("data1");
    }, 1000);
  }
  
  function processData(data1, callback) {
    setTimeout(() => {
      callback("processed" + data1);
    }, 1000);
  }
  
  function saveData(result1, callback) {
    setTimeout(() => {
      callback("saved" + result1);
    }, 1000);
  }
  
  function sendConfirmation(result2, callback) {
    setTimeout(() => {
      callback("confirmation sent for" + result2);
    }, 1000);
  }
  
//Running the callback hell example
  getData(function(data1) {
    processData(data1, function(result1) {
      saveData(result1, function(result2) {
        sendConfirmation(result2, function(finalResult) {
          console.log("Data processing complete:", finalResult);
        });
      });
    });
  });
  
  //promises
  let promise = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
      resolve("Operation successful!");
    } else {
      reject("Operation failed!");
    }
  });
  //can handle promise success code through .then and failure code through ,catch
  promise
    .then((result) => {
      console.log(result);//"Operation successful!"
    })
    .catch((error) => {
      console.log(error);//"Operation failed!"
    });
  
    //fetchAPI is a modern promise based way to make HTTP requests in JavaScript repalces older XMLHTTPRequest method
    //fetch(url): Initiates a network request to the provided URL and returns a promise
    //.then(): Handles the response once the promise resolves
    //.catch(): Catches any errors like network issues or server errors
//using fetchAPI for GET request
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())//Convert the response to JSON
  .then((data) => {
    console.log(data);//Log the fetched data
  })
  .catch((error) => {
    console.log("Error:", error);//Handle errors
  });

  //usinf FetchAPI for POST request data
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "New Post",
      body: "This is the content of the new post.",
      userId: 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Post created:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  //using fetch with async/await
  async function fetchPosts() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  
  fetchPosts();
  //large responses using streams
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    const reader = response.body.getReader();
    reader.read().then(({ done, value }) => {
      console.log("Stream data chunk:", new TextDecoder().decode(value));
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  
  //fetching data and rendering which shows output on the webpage
//   async function fetchAndRenderPosts() {
//     const postsContainer = document.getElementById("posts");
  
//     try {
//       const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const posts = await response.json();
  
//       posts.forEach((post) => {
//         const postElement = document.createElement("div");
//         postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
//         postsContainer.appendChild(postElement);
//       });
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   }
  
//   fetchAndRenderPosts();
  

//this above wont show output rn since its not connected to a dom rn or a fronten d webpage