var http = require('http');
var fs = require('fs');

// Create the HTTP server
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("Hello World");
}).listen(8080);

console.log("Server running at http://localhost:8080/");

// Create a file
fs.open('mynewfile2.txt', 'w', function (err, file) {
    if (err) throw err;
    console.log('File created: mynewfile2.txt');
});
fs.appendFile('mynewfile2.txt', ' This is my text.', function (err) {
    if (err) throw err;
    console.log('Updated!');
  });