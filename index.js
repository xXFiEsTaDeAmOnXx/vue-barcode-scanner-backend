
const express = require('express');
const cors = require('cors')
const pkg = require('./package.json');

// Configure routes
const router = express.Router();
// App constants
const port = process.env.PORT || 3000;

// Store data in-memory, not suited for production use!
const db = {
  productCatalog: [
    { name: "Krumbach Wasserflasche", pictureLoc: "src/assets/krumbach.jpg", barcode: 4009228120053 },
    { name: "Aqua Wasserflasche", pictureLoc: "src/assets/aqua.jpg", barcode: 4001428065417 },
    { name: "Kreidebox", pictureLoc: "src/assets/krumbach.jpg", barcode: 12134 },
  ]
  };
  
// Create the Express app & setup middlewares
const app = express();
app.use(express.json()) // parses incoming json requests
app.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/}));
app.options('*', cors());




// Hello World for index page
app.get('/', function (req, res) {
    return res.json(db.productCatalog);
})

  

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
  
