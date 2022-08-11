const http = require('http')
const fs = require('fs')
// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    fs.createReadStream('index.html').pipe(res);
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');