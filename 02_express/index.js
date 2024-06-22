require('dotenv').config();
const express = require('express');
const logger = require('./logger');
const morgan = require('morgan');

const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;

const products = [];
let productId = 1;

const morganFormat = ':method :url :status :response-time ms';

app.use(morgan(morganFormat, {
  stream: {
    write: (message) => {
      const logObject = {
        method: message.split(' ')[0],
        url: message.split(' ')[1],
        status: message.split(' ')[2],
        responseTime: message.split(' ')[3],

      };
      logger.info(JSON.stringify(logObject));
    }
  }
}));

app.post('/products', (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    id: productId++,
    name,
    price
  };

  products.push(newProduct);

  return res.status(201).send(newProduct);
});

app.get('/products', (req, res) => {
  return res.status(200).send(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(product => product.id === parseInt(req.params.id));

  if(!product) {
    return res.status(404).send('Product not found!');
  }

  return res.status(200).send(product);
});

app.put('/products/:id', (req, res) => {
  const product = products.find(product => product.id === parseInt(req.params.id));

  if(!product) {
    return res.status(404).send('Product not found!');
  }

  product.name = req.body.name;
  product.price = req.body.price;

  return res.status(200).send(product);
});

app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(product => product.id === parseInt(req.params.id));

  if(productIndex === -1) {
    return res.status(404).send('Product not found!');
  }

  products.splice(productIndex, 1);

  return res.status(204).send('Product deleted!');
});

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});
