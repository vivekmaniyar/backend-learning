const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if(req.url === '/hello') {
    res.statusCode = 200;
    res.end('Hello My Name is Vivek Maniyar');
  } else {
    res.statusCode = 404;
    res.end('404 Page Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server Listening on http://${hostname}:${port}`);
});
