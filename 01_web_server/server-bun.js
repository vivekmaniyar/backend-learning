import {serve} from 'bun';

const hostname = '127.0.0.1';
const port = 3000;

serve({
  fetch(request) {
    const url = new URL(request.url);
    if(url.pathname === '/hello') {
      return new Response('Hello My Name is Vivek Maniyar', {status: 200});
    } else {
      return new Response('404 Page Not Found', {status: 404});
    }
  },
  port,
  hostname,
});

console.log(`Bun Server Running on http://${hostname}:${port}`);
