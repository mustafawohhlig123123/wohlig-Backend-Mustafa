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

 fs.unlink('mynewfile2.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
}); 
var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //'localhost:8080'
console.log(q.pathname); // '/default.htm'
console.log(q.search); //'?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //'february'