/*
    API REST ne necessitant pas d'authentification, permettant l'accès à plusieurs services web :
      - ajouter produit : app.post("/products", products.create);
      - liste des produits : app.get("/products", products.findAll);
      - retrouver un produit par son id : app.get("/products/:productId", products.findOne);
      - mettre à jour un produit : app.put("/products/:productId", products.update);
      - supprimer un produit : app.delete("/products/:productId", products.delete);
      - supprimer tous les produits : app.delete("/products", products.deleteAll);

      -> idem pour les catégories de produits :
      - ajouter catégorie : app.post("/categories", categories.create);
      - .............
      -> avec en plus, la possibilitée de renvoyer tous les produits d'une catégorie donnée :
      - app.get("/categories/:categorieId/products", categories.productsbycat);

      -> Créer une commande : app.post("/order", order.create); se déroulera comme suit :
      1/ on crée un client avec les infos de la commande : name + address + email + phone...       ToDO : s'il existe déjà
      2/ on crée la commande : date de création + total + idClient
      3/ on crée les commandes minifiées : price + quantité + idCommande + idProduit    ToDO
      4/ Si tout est ok, on renvoi la commande côté front afin d'afficher la confirmation avec infos commande
*/

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
