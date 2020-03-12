
const express = require("express");
var cors = require('cors')
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to simplon application." });
}); 

// on précise ici qu'on autorise toutes les sources
// puis dans le second header, quels headers http sont acceptés
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//L'appli requière les routes correspondant aux web services ou url liées aux produits
require("./routes/products.routes.js")(app);

//L'appli requière les routes correspondant aux web services ou url liées aux catégories
require("./routes/categories.routes.js")(app);

//Gestion d'une commande
require("./routes/order.routes.js")(app);

// set port, listen for requests
app.listen(8888, () => {
  console.log("Server is running on port 8888.");
});
