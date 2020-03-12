
//Les routes sollicitent le controller ici qui 
module.exports = app => {
  const categories = require("../controllers/categorie.controller.js");

  // Create a new Categorie
  app.post("/categories", categories.create);

  // Retrieve all categories
  app.get("/categories", categories.findAll);

  // Retrieve a single categorie with CategorieId
  app.get("/categories/:categorieId", categories.findOne);

  // Retrieve a products classed by categorie -> http://localhost:8888/categories/2/products
  app.get("/categories/:categorieId/products", categories.productsbycat);

  // Update a categories with categorieId
  app.put("/categories/:categorieId", categories.update);

  // Delete a categorie with categorieId
  app.delete("/categories/:categorieId", categories.delete);

  // Create a new categorie
  app.delete("/categories", categories.deleteAll);
};