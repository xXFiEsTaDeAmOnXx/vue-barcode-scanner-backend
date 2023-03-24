const express = require('express');
const cors = require('cors');
const pkg = require('./package.json');
const fs = require('fs');

// Configure routes
const router = express.Router();
// App constants
const port = process.env.PORT || 3000;

// Create the Express app & setup middlewares
const app = express();
app.use(express.json()); // parses incoming json requests
app.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/ }));
app.options('*', cors());

// Hello World for index page
app.get('/api/item/:id', function (req, res) {
  const id = req.params.id;
  console.log(id);
  fs.readFile('./db.txt', 'utf-8', (err, content) => {
    if (err) throw err;
    const item = JSON.parse(content).filter(
      (product) => product.barcode == id
    )[0];
    if (!item) {
      res.writeHead(404);
      res.write(JSON.stringify({ msg: 'item not found' }));
      return res.end();
    }
    res.writeHead(200);
    res.write(JSON.stringify(item));
    return res.end();
  });
});

app.get('/api/items', function (req, res) {
  const id = req.params.id;
  fs.readFile('./db.txt', 'utf-8', (err, content) => {
    if (err) throw err;
    res.writeHead(200);
    res.write(JSON.stringify(content));
    return res.end();
  });
});

app.get('/api/image/:name', (req, res) => {
  const name = req.params.name;
  console.log(name);
  if (name !== undefined && name !== 'undefined') {
    res.sendFile('/assets/' + name, { root: __dirname }, function (err) {
      if (err) {
        res
          .status(500)
          .send('Oh uh, something went wrong on tha server. ' + err);
      }
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
